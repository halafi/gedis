import React from "react"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import firebase from "firebase"
import { Container, Button, Row, Col, InputGroup, Input, InputGroupAddon, ListGroup, ListGroupItem } from "reactstrap"

import Navbar from "../components/Navbar.js"
import * as UserActions from "../actions/UserActions"
import { userSelector } from "../stores/selectors/userSelector"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: "",
			messages: [],
		}
		this.handleLogin = this.handleLogin.bind(this)
		this.handleRegistration = this.handleRegistration.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is signed in.")
				this.props.dispatch(UserActions.loginUser(user)) // user is signed in
				console.log(this.props.user)
			} else {
				console.log("No user is signed in.")
				this.props.dispatch(UserActions.logoutUser()) // no user is signed in
				console.log(this.props.user)
			}
		})
		this.messagesRef = firebase.database().ref("messages")
		const messages = []
		this.messagesRef.on("child_added", (dataSnapshot) => {
			messages.push(dataSnapshot.val())
			this.setState({
				messages,
			})
		})
	}

	handleLogin(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(error => (console.log(error.code, error.message)))
	}

	handleRegistration(email, password, userName) {
		const { dispatch } = this.props

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				const user = firebase.auth().currentUser
				user.updateProfile({
					displayName: userName,
				}).then(() => {
					console.log("user updated")
					dispatch(UserActions.loginUser(user))
				}, (error) => {
					console.log(error)
				})
			})
			.catch(error => (console.log(error.code, error.message)))
	}

	handleLogout() {
		firebase.auth().signOut().then(() => console.log("logout success"))
	}

	handleChange(e) {
		this.setState({ text: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()
		this.messagesRef.push({
			user: this.props.user.displayName,
			text: this.state.text,
		})
		this.setState({
			text: "",
		})
	}

	render() {
		const { user } = this.props
		const { messages } = this.state

		return (
			<Container>
				<Navbar user={user} onLogout={this.handleLogout} onLogin={this.handleLogin} onRegistration={this.handleRegistration} />
				{user.uid &&
					<Row style={{ "marginTop": "15px" }}>
						<Col xs="12">
							<InputGroup>
								<InputGroupAddon>{user.displayName}</InputGroupAddon>
								<Input placeholder="text" value={this.state.text} onChange={this.handleChange} />
							</InputGroup>
							<Button color="primary" onClick={this.handleSubmit}>Send</Button>
						</Col>
					</Row>
				}
				<Row style={{ "marginTop": "15px" }}>
					<Col xs="12">
						<ListGroup>
							{messages.map((item, i) => (
								<ListGroupItem key={i}><small>{item.user}: {item.text}</small></ListGroupItem>
							))}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		)
	}
}

reactMixin.onClass(App, ReactFireMixin)

App.propTypes = {
	user: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

export default connect((state) => {
	return {
		user: userSelector(state),
	}
})(App)

