import React from "react"
import ReactFireMixin from "reactfire"
import reactMixin from "react-mixin"
import classnames from "classnames"
import {
	Form,
	FormGroup,
	Label,
	Input,
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


class LoginModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTab: "1",
			displayName: "",
			email: "",
			password: "",
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
				displayName: "",
				email: "",
				password: "",
			})
		}
	}

	handleChange(field, e) {
		this.setState({ [field]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()
		if (this.state.password.length < 6) {
			return
		}
		if (this.state.email.length < 6) {
			return
		}
		if (this.state.displayName.length < 4) {
			return
		}
		if (this.state.activeTab === "1") {
			this.props.onLogin(this.state.email, this.state.password)
		} else if (this.state.activeTab === "2") {
			this.props.onRegister(this.state.email, this.state.password, this.state.displayName)
		}
	}

	render() {
		const { open, toggle } = this.props
		const { email, password, displayName, activeTab } = this.state

		const firstTabClasses = classnames({ active: activeTab === "1" })
		const secondTabClasses = classnames({ active: activeTab === "2" })

		const submitBtnLabel = activeTab === "1" ? "Log In" : "Register"
		return (
			<Modal isOpen={open} toggle={toggle}>
				<ModalHeader toggle={toggle}>Sign In</ModalHeader>
				<Nav tabs style={{ "marginTop": "15px" }}>
					<NavItem style={{"cursor": "pointer"}}>
						<NavLink className={firstTabClasses} onClick={() => { this.toggle("1") }} >
							Existing User
						</NavLink>
					</NavItem>
					<NavItem style={{"cursor": "pointer"}}>
						<NavLink className={secondTabClasses} onClick={() => { this.toggle("2") }} >
							New User
						</NavLink>
					</NavItem>
				</Nav>
				<Form>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<ModalBody>
								<FormGroup>
									<Label for="userEmail">Email</Label>
									<Input
										id="userEmail" type="email" name="email" placeholder="Email"
										value={email}
										onChange={(e) => { this.handleChange("email", e) }}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="userPassword">Password</Label>
									<Input
										id="userPassword" type="password" name="password" placeholder="Password"
										value={password}
										onChange={(e) => { this.handleChange("password", e) }}
									/>
								</FormGroup>
							</ModalBody>
						</TabPane>
						<TabPane tabId="2">
							<ModalBody>
								<FormGroup>
									<Label for="displayName">Display Name</Label>
									<Input
										id="displayName" type="text" name="displayName" placeholder="Name"
										value={displayName}
										onChange={(e) => { this.handleChange("displayName", e) }}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="userEmail">Email</Label>
									<Input
										id="userEmail" type="email" name="email" placeholder="Email"
										value={email}
										onChange={(e) => { this.handleChange("email", e) }}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="userPassword">Password</Label>
									<Input
										id="userPassword" type="password" name="password" placeholder="Password"
										value={password}
										onChange={(e) => { this.handleChange("password", e) }}
									/>
								</FormGroup>
							</ModalBody>
						</TabPane>
					</TabContent>
					<ModalFooter>
						<Button onClick={this.handleSubmit} color="primary">{ submitBtnLabel }</Button>
						{" "}
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</Form>
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
