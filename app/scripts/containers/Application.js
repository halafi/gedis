import React from "react"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import moment from "moment"
import { List } from "immutable"
import { Container, Row, Col } from "reactstrap"
import firebase from "firebase"

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
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
		let messages = new List() // not merged messages
		this.messagesRef = firebase.database().ref("messages")
		this.messagesRef.on("child_added", (dataSnapshot) => {
			const msg = dataSnapshot.val()
			if (messages.size > 0 && msg.uid === messages.get(messages.size - 1).uid) {
				const editedMsg = messages.get(messages.size - 1)
				editedMsg.text = `${editedMsg.text}\n${msg.text}`
				messages = messages.set(messages.size - 1, editedMsg)
			} else {
				messages = messages.push(dataSnapshot.val())
			}
			this.setState({
				messages: new List(messages.toJS()),
			})
		})
		this.messagesRef.on("child_removed", () => { // fix this to support deletion of single messages
			messages = new List()
			this.setState({
				messages,
			})
		})
		this.onlineUsers = new Gathering(firebase.database())
		this.onlineUsers.onUpdated((count, users) => { // called every time user list updated
			this.setState({
				onlineUsers: users,
			})
		})
	}

	handleChange(val) {
		this.setState({ text: val })
	}

	handleSubmit(e) {
		const { user } = this.props
		const { text, messages } = this.state

		if (e) e.preventDefault()
		if (text.length > 0) {
			if (text[0] === "/") { // command
				let updateOnly = false
				if (messages.size > 0 && messages.get(messages.size - 1).uid === "command") {
					updateOnly = true
				}
				if (text === "/clearall") {
					this.clearMessages()
				} else if (text === "/help") {
					if (updateOnly) {
						this.setState({
							text: "",
							messages: messages.set(messages.size - 1, {
								uid: "command",
								text: "Commands begin with /. You can use /clear to delete history of all messages.",
								time: moment().format(),
							}),
						})
					} else {
						this.setState({
							text: "",
							messages: messages.push({
								uid: "command",
								text: "Commands begin with /. You can use /clear to delete history of all messages.",
								time: moment().format(),
							}),
						})
					}
				} else if (updateOnly) {
					this.setState({
						text: "",
						messages: messages.set(messages.size - 1, {
							uid: "command",
							text: `${text} is not a valid command. To see a list of available commands use /help.`,
							time: moment().format(),
						}),
					})
				} else {
					this.setState({
						text: "",
						messages: messages.push({
							uid: "command",
							text: `${text} is not a valid command. To see a list of available commands use /help.`,
							time: moment().format(),
						}),
					})
				}
			} else { // normal message
				this.messagesRef.push({
					uid: user.uid,
					text,
					time: moment().format(),
				})
				this.setState({
					text: "",
				})
			}
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
		const { user, dispatch } = this.props
		const { messages, onlineUsers } = this.state

		return (
			<Container>
				<Navbar user={user} onlineUsers={this.onlineUsers} dispatch={dispatch} />
				{user.uid &&
					<Row>
						<Col xs="4" sm="4" md="3" lg="2">
							<SidePanel onlineUsers={onlineUsers}/>
						</Col>
						<Col xs="8" sm="8" md="9" lg="10">
							<ChatWindow messages={messages}/>
							<InputBar
								value={this.state.text}
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

