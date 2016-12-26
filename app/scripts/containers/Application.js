import React from "react"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import firebase from "firebase"
import moment from "moment"
import { List } from "immutable"
import { Container, Row, Col, Card, CardBlock } from "reactstrap"
import Gathering from "../firebase/gathering"
import Navbar from "../components/Navbar.js"
import * as UserActions from "../actions/UserActions"
import { userSelector } from "../selectors/userSelector"
import ChatWindow from "../components/ChatWindow"
import InputBar from "../components/InputBar"
import SidePanel from "../components/SidePanel"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { // todo record
			text: "",
			messages: new List(),
			onlineUsers: {},
		}
		this.initFirebase = this.initFirebase.bind(this)
		this.handleRegistration = this.handleRegistration.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.clearMessages = this.clearMessages.bind(this)
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user && user.displayName) { // registered and logged in user does not have displayName
				this.onlineUsers.join(user.uid, user.displayName)
				this.props.dispatch(UserActions.loginUser(user))
				console.info("User is signed in.", this.props.user)
			} else {
				this.onlineUsers.leave()
				this.props.dispatch(UserActions.logoutUser())
				console.info("No user is signed in.")
			}
		})
		this.initFirebase()
	}

	initFirebase() {
		const messages = []
		this.messagesRef = firebase.database().ref("messages")
		this.messagesRef.on("child_added", (dataSnapshot) => {
			const msg = dataSnapshot.val()
			if (messages.length > 0 && msg.user === messages[messages.length - 1].user) {
				messages[messages.length - 1].text += `\n${msg.text}`
			} else {
				messages.push(dataSnapshot.val())
			}
			this.setState({
				messages: new List(messages),
			})
		})
		this.onlineUsers = new Gathering(firebase.database())
		this.onlineUsers.onUpdated((count, users) => { // called every time user list updated
			this.setState({
				onlineUsers: users,
			})
		})
	}

	handleLogin(email, password) {
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(error => (console.error(error.code, error.message)))
	}

	handleLogout() {
		firebase.auth().signOut()
	}

	handleRegistration(email, password, userName) {
		const { dispatch } = this.props

		firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				const user = firebase.auth().currentUser
				user.updateProfile({
					displayName: userName,
				}).then(
					() => {
						this.onlineUsers.join(user.uid, user.displayName)
						dispatch(UserActions.loginUser(user))
					},
					error => console.error(error),
				)
			})
			.catch(error => (console.error(error.code, error.message)))
	}

	handleChange(e) {
		this.setState({ text: e.target.value })
	}

	handleSubmit(e) {
		const { user } = this.props
		const { text, messages } = this.state

		if (e) e.preventDefault()
		if (text.length > 0) {
			if (text[0] === "/") { // command
				let updateOnly = false
				if (messages.size > 0 && messages.get(messages.size - 1).user === "command") {
					updateOnly = true
				}
				if (text === "/clear") {
					this.clearMessages()
				} else if (text === "/help") {
					if (updateOnly) {
						this.setState({
							text: "",
							messages: messages.set(messages.size - 1, {
								user: "command",
								text: "Commands begin with /. You can use /clear to delete history of all messages.",
								time: moment().format("HH:mm"),
							}),
						})
					} else {
						this.setState({
							text: "",
							messages: messages.push({
								user: "command",
								text: "Commands begin with /. You can use /clear to delete history of all messages.",
								time: moment().format("HH:mm"),
							}),
						})
					}
				} else if (updateOnly) {
					this.setState({
						text: "",
						messages: messages.set(messages.size - 1, {
							user: "command",
							text: `${text} is not a valid command. To see a list of available commands use /help.`,
							time: moment().format("HH:mm"),
						}),
					})
				} else {
					this.setState({
						text: "",
						messages: messages.push({
							user: "command",
							text: `${text} is not a valid command. To see a list of available commands use /help.`,
							time: moment().format("HH:mm"),
						}),
					})
				}
			} else { // normal message
				this.messagesRef.push({
					user: user.displayName,
					text,
					time: moment().format("HH:mm"),
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
				messages: new List(),
			})
			this.initFirebase()
		})
	}

	render() {
		const { user } = this.props
		const { messages, onlineUsers } = this.state

		return (
			<Container>
				<Navbar user={user} onLogout={this.handleLogout} onLogin={this.handleLogin} onRegistration={this.handleRegistration} />
				{user.uid &&
					<Row>
						<Col xs="2">
							<SidePanel onlineUsers={onlineUsers}/>
						</Col>
						<Col xs="10">
							<ChatWindow messages={messages}/>
							<InputBar
								value={this.state.text}
								onKeyPress={this.handleKeyPress}
								onSubmit={this.handleSubmit}
								onChange={this.handleChange}
							/>
						</Col>
					</Row>
				}
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

