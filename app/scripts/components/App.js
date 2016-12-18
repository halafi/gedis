import React from "react"
import { Container, Button, Row, Col, InputGroup, Input, InputGroupAddon, ListGroup, ListGroupItem } from "reactstrap"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import firebase from "firebase"

import AppNavbar from "./AppNavbar.js"
import { incrementCredits } from "../actions/GameActions"
import { gameSelector } from "../stores/selectors/gameSelector"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: "fap",
			items: [],
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
	}

	componentWillMount() {
		this.firebaseRef = firebase.database().ref("items") //  reference to the items node at the root of the database
		const items = []
		this.firebaseRef.on("child_added", (dataSnapshot) => { // run every time a node is added under the items node
			items.push(dataSnapshot.val())
			this.setState({
				items,
			})
		})
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is signed in.")
				console.log(user.email)
			} else {
				console.log("No user is signed in.")
			}
		})
	}

	handleChange(e) {
		this.setState({ text: e.target.value })
	}

	handleSubmit(e) {
		// this.props.dispatch(incrementCredits(10))
		e.preventDefault()
		this.firebaseRef.push({
			text: this.state.text,
		})
		this.setState({
			text: "",
		})
	}

	render() {
		// const { game } = this.props
		const { items } = this.state

		return (
			<Container>
				<AppNavbar />
				<Row>
					<Col xs="12">
						<InputGroup>
							<InputGroupAddon>@</InputGroupAddon>
							<Input placeholder="text" value={this.state.text} onChange={this.handleChange} />
						</InputGroup>
						<Button color="primary" onClick={this.handleSubmit}>Submit</Button>
						<ListGroup>
							{items.map((item, i) => (
								<ListGroupItem key={i}>{item.text}</ListGroupItem>
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
	game: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

export default connect((state) => {
	return {
		game: gameSelector(state),
	}
})(App)

