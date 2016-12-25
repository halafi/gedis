import React from "react"
import ReactFireMixin from "reactfire"
import reactMixin from "react-mixin"
import classnames from "classnames"
import {
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


class LoginModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTab: "1",
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
		}
		this.handleChange = this.handleChange.bind(this)
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
			})
		}
	}

	handleChange(field, value) {
		this.setState({ [field]: value })
	}

	handleValidSubmit(event, values) {
		if (this.state.activeTab === "1") {
			this.props.onLogin(this.state.email, this.state.password)
		} else if (this.state.activeTab === "2") {
			this.props.onRegister(this.state.email, this.state.password, this.state.displayName)
		}
	}

	render() {
		const { open, toggle } = this.props
		const { email, password, confirmPassword, displayName, activeTab } = this.state

		const firstTabClasses = classnames({ active: activeTab === "1" })
		const secondTabClasses = classnames({ active: activeTab === "2" })

		const submitBtnLabel = activeTab === "1" ? "Log In" : "Register"
		return (
			<Modal isOpen={open} toggle={toggle}>
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

reactMixin.onClass(LoginModal, ReactFireMixin)

LoginModal.propTypes = {
	open: React.PropTypes.bool.isRequired,
	toggle: React.PropTypes.func.isRequired,
	onLogin: React.PropTypes.func.isRequired,
	onRegister: React.PropTypes.func.isRequired,
}

export default LoginModal
