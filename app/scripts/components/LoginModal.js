import React from "react"
import classnames from "classnames"
import firebase from "firebase"
import {
	Alert,
	Label,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Nav,
	NavItem,
	NavLink,
	TabPane,
	TabContent,
} from "reactstrap"
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from "availity-reactstrap-validation"

import * as UserActions from "../actions/UserActions"


class LoginModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTab: "1",
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
			error: null,
		}
		this.handleChange = this.handleChange.bind(this)
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
		this.handleValidSubmit = this.handleValidSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.open && !this.props.open) {
			this.setState({
				activeTab: "1",
				displayName: "",
				email: "",
				password: "",
				confirmPassword: "",
				error: null,
			})
		}
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
				displayName: "",
				email: "",
				password: "",
				confirmPassword: "",
				error: null,
			})
		}
	}

	login() {
		const { toggle } = this.props
		const { email, password } = this.state

		let hasErrors = false
		this.setState({ error: null })

		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((error) => {
				hasErrors = true
				this.setState({ error })
			})
			.then(() => {
				if (!hasErrors) {
					toggle()
				}
			})
	}

	register() {
		const { dispatch, toggle, onlineUsers } = this.props
		const { email, password, displayName } = this.state

		let hasErrors = false
		this.setState({ error: null })

		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch((error) => {
				hasErrors = true
				this.setState({ error })
			})
			.then(() => {
				if (!hasErrors) {
					const user = firebase.auth().currentUser
					user.updateProfile({
						displayName,
					}).then(
						() => {
							onlineUsers.join(user.uid, user.displayName)
							dispatch(UserActions.loginUser(user))
							if (!hasErrors) {
								firebase.database().ref().child("users").child(user.uid)
									.set({
										displayName: user.displayName,
										email: user.email,
										photoURL: user.photoURL,
									})
								toggle()
							}
						},
						(error) => {
							hasErrors = true
							this.setState({ error })
						},
					)
				}
			})
	}

	handleChange(field, value) {
		this.setState({ [field]: value })
	}

	handleValidSubmit() {
		if (this.state.activeTab === "1") {
			this.login()
		} else if (this.state.activeTab === "2") {
			this.register()
		}
	}

	render() {
		const { open, toggle } = this.props
		const { email, password, confirmPassword, displayName, activeTab, error } = this.state

		const firstTabClasses = classnames({ active: activeTab === "1" })
		const secondTabClasses = classnames({ active: activeTab === "2" })

		const submitBtnLabel = activeTab === "1" ? "Log In" : "Register"
		return (
			<Modal size="md" isOpen={open} toggle={toggle}>
				<ModalHeader toggle={toggle}>Sign In</ModalHeader>
				<AvForm onValidSubmit={this.handleValidSubmit}>
					<Nav tabs style={{ "marginTop": "15px" }}>
						<NavItem style={{ "cursor": "pointer" }}>
							<NavLink className={firstTabClasses} onClick={() => { this.toggle("1") }} >
								Existing User
							</NavLink>
						</NavItem>
						<NavItem style={{ "cursor": "pointer" }}>
							<NavLink className={secondTabClasses} onClick={() => { this.toggle("2") }} >
								New User
							</NavLink>
						</NavItem>
					</Nav>
					<ModalBody>
						{error &&
							<Alert color="danger">
								<strong>Error!</strong> {error.message}
							</Alert>
						}
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								<AvGroup>
									<Label for="userEmail">Email</Label>
									<AvInput
										id="userEmail" type="email" name="email" placeholder="Email"
										value={email}
										onChange={(val) => { this.handleChange("email", val) }}
										validate={{ email: true, required: true }}
									/>
									<AvFeedback>Invalid email</AvFeedback>
								</AvGroup>
								<AvGroup>
									<Label for="userPassword">Password</Label>
									<AvInput
										id="userPassword" type="password" name="password" placeholder="Password"
										value={password}
										onChange={(val) => { this.handleChange("password", val) }}
										validate={{ minLength: { value: 6 }, required: true }}
									/>
									<AvFeedback>Password is too short</AvFeedback>
								</AvGroup>
							</TabPane>
							<TabPane tabId="2">
								<AvGroup>
									<Label for="displayName">Display Name</Label>
									<AvInput
										id="displayName" type="text" name="displayName" placeholder="Name"
										value={displayName}
										onChange={(e) => { this.handleChange("displayName", e) }}
										validate={activeTab === "2" ? { minLength: { value: 4 }, required: true } : {}}
									/>
									<AvFeedback>Display name is too short</AvFeedback>
								</AvGroup>
								<AvGroup>
									<Label for="userEmail">Email</Label>
									<AvInput
										id="userEmail" type="email" name="email" placeholder="Email"
										value={email}
										onChange={(e) => { this.handleChange("email", e) }}
										validate={{ email: true, required: true }}
									/>
									<AvFeedback>Invalid email</AvFeedback>
								</AvGroup>
								<AvGroup>
									<Label for="userPassword">Password</Label>
									<AvInput
										id="userPassword" type="password" name="password" placeholder="Password"
										value={password}
										onChange={(e) => { this.handleChange("password", e) }}
										validate={{ minLength: { value: 6 }, required: true }}
									/>
									<AvFeedback>Password is too short</AvFeedback>
								</AvGroup>
								<AvGroup>
									<Label for="userPassword2">Confirm password</Label>
									<AvInput
										id="confirm_password" type="password" name="confirm_password" placeholder="Confirm password"
										value={confirmPassword}
										onChange={(e) => { this.handleChange("confirmPassword", e) }}
										validate={activeTab === "2"
											? { required: true, match: { value: "password" } }
											: {}}
									/>
									<AvFeedback>Passwords must match</AvFeedback>
								</AvGroup>
							</TabPane>
						</TabContent>
					</ModalBody>
					<ModalFooter>
						<Button type="submit" color="primary">{ submitBtnLabel }</Button>
						{" "}
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</AvForm>
			</Modal>
		)
	}
}

LoginModal.propTypes = {
	open: React.PropTypes.bool.isRequired,
	toggle: React.PropTypes.func.isRequired,
	onlineUsers: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

export default LoginModal
