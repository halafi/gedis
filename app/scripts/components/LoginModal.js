import React from "react"
import ReactFireMixin from "reactfire"
import reactMixin from "react-mixin"
import firebase from "firebase"
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"


class LoginModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: "",
		}
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value })
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value })
	}

	handleLogin(e) {
		e.preventDefault()
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(error => (console.log(error.code, error.message)))
		this.props.toggle()
	}

	render() {
		const { open, toggle } = this.props
		const { email, password } = this.state

		return (
			<Modal isOpen={open} toggle={toggle}>
				<ModalHeader toggle={toggle}>Sign In</ModalHeader>
				<Form>
					<ModalBody>
						<FormGroup>
							<Label for="userEmail">Email</Label>
							<Input
								id="userEmail" type="email" name="email" placeholder="Email"
								value={email}
								onChange={this.handleEmailChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="userPassword">Password</Label>
							<Input
								id="userPassword" type="password" name="password" placeholder="Password"
								value={password}
								onChange={this.handlePasswordChange}
							/>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button onClick={this.handleLogin} color="primary">Submit</Button>
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
}

export default LoginModal
