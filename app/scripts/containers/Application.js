import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import firebase from "firebase"
import moment from "moment"
import _ from "lodash"
import {
	Container,
	Button,
	Row,
	Col,
	InputGroup,
	Input,
	InputGroupButton,
	Card,
	CardBlock,
} from "reactstrap"
import Gathering from "../firebase/gathering"
import Navbar from "../components/Navbar.js"
import * as UserActions from "../actions/UserActions"
import { userSelector } from "../selectors/userSelector"
import Message from "../components/Message"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: "",
			messages: [],
			onlineUsers: [],
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

	// componentDidMount() {
	// 	this.handleResize()
	//
	// 	// Scroll to the bottom on initialization
	// 	const len = this.props.messages.length - 1
	// 	const node = ReactDOM.findDOMNode(this['_div' + len])
	// 	if (node) {
	// 		node.scrollIntoView()
	// 	}
	// }

	componentDidUpdate() {
		// Scroll as new elements come along
		console.log(this.refs)
		console.log(this.chat)
		// this._chatDiv.scrollTop = 0
	}

	initFirebase() {
		const messages = []
		this.messagesRef = firebase.database().ref("messages")
		this.messagesRef.on("child_added", (dataSnapshot) => {
			messages.push(dataSnapshot.val())
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
			if (text[0] === "/") {
				if (text === "/clear") {
					this.clearMessages()
				} else if (text === "/help") {
					messages.push({
						user: "command",
						text: "Commands begin with /. You can use /clear to delete history of all messages.",
						time: moment().format("HH:mm"),
					})
					this.setState({
						text: "",
						messages,
					})
				} else {
					messages.push({
						user: "command",
						text: `${text} is not a valid command. To see a list of available commands use /help.`,
						time: moment().format("HH:mm"),
					})
					this.setState({
						text: "",
						messages,
					})
				}
			} else {
				// if (messages[messages.length - 1].user === user.displayName) {
					// TODO merge messages
				// }
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
				messages: [],
			})
			this.initFirebase()
		})
	}

	render() {
		const { user } = this.props
		const { messages, onlineUsers } = this.state

		const shownMessages = messages.map((item, i) => (
			<Message
				key={i}
				userName={item.user}
				value={item.text}
				time={item.time}
			/>
		))
		const onlineUsersCount = onlineUsers ? Object.keys(onlineUsers).length : 0
		const onlineUsersEl = _.map(onlineUsers, (u, i) => {
			return (
				<div key={i}>
					{u}
				</div>
			)
		})

		return (
			<Container>
				<Navbar user={user} onLogout={this.handleLogout} onLogin={this.handleLogin} onRegistration={this.handleRegistration} />
				<Row>
					<Col xs="2">
						<Card>
							<CardBlock className="chat">
								<small>
									<strong>Online</strong><br/>
									{onlineUsersEl}
								</small>
							</CardBlock>
						</Card>
					</Col>
					<Col xs="10">
						{user.uid &&
							<div>
								<Card>
									<CardBlock className="chat" ref={(chat) => { this.chat = chat }} >
										{shownMessages}
									</CardBlock>
								</Card>
							</div>
						}
					</Col>
				</Row>
				<Row>
					<Col xs="12">
						<InputGroup size="md">
							<InputGroupButton>
								<Button disabled onClick={this.handleSubmit}>+</Button>
							</InputGroupButton>
							<Input
								placeholder="Message"
								value={this.state.text}
								onChange={this.handleChange}
								onKeyPress={this.handleKeyPress}
							/>
							<InputGroupButton>
								<Button onClick={this.handleSubmit}>Send</Button>
							</InputGroupButton>
						</InputGroup>
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

