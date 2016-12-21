import React from "react"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import firebase from "firebase"
import {
	Container,
	Button,
	Row,
	Col,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupButton,
	Card,
	CardBlock,
} from "reactstrap"

import Navbar from "../components/Navbar.js"
import * as UserActions from "../actions/UserActions"
import { userSelector } from "../stores/selectors/userSelector"
import Message from "../components/Message"

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
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
		this.clearMessages = this.clearMessages.bind(this)
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
		if (e) e.preventDefault()
		if (this.state.text.length > 0) {
			if (this.state.text === "/clear") {
				this.clearMessages()
			} else {
				this.messagesRef.push({
					user: this.props.user.displayName,
					text: this.state.text,
				})
				this.setState({
					text: "",
				})
			}
		}
	}

	handleKeyPress(target) {
		if (target.charCode === 13) {
			this.handleSubmit(null)
		}
	}

	clearMessages() {
		this.messagesRef.remove().then(() => {
			console.log("Remove succeeded.")
			this.setState({
				text: "",
				messages: [],
			})
			this.messagesRef = firebase.database().ref("messages")
			const messages = [] // do not like this duplicate code
			this.messagesRef.on("child_added", (dataSnapshot) => {
				messages.push(dataSnapshot.val())
				this.setState({
					messages,
				})
			})
		})
	}

	render() {
		const { user } = this.props
		const { messages } = this.state

		const shownMessages = messages.map((item, i) => {
			if (i > messages.length - 25) {
				return (
					<Message key={i} userName={item.user} value={item.text} />
				)
			}
			return null
		})

		return (
			<Container>
				<Navbar user={user} onLogout={this.handleLogout} onLogin={this.handleLogin} onRegistration={this.handleRegistration} />
				{user.uid &&
					<Row style={{ "marginTop": "15px" }}>
						<Col xs="12">
							<InputGroup size="md">
								<InputGroupAddon>{user.displayName}:</InputGroupAddon>
								<Input placeholder="text" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
								<InputGroupButton><Button onClick={this.handleSubmit}>Send</Button></InputGroupButton>
							</InputGroup>
						</Col>
					</Row>
				}
				<Row style={{ "marginTop": "15px" }}>
					<Col xs="12">
						<Card>
							<CardBlock>
								{shownMessages}
							</CardBlock>
						</Card>
						{/*<Card>*/}
							{/*<CardBlock>*/}
								{/*<small>User: { JSON.stringify(user) }</small>*/} {/*TODO environment variables for webpack*/}
							{/*</CardBlock>*/}
						{/*</Card>*/}
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

