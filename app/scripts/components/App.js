import React from "react"
import { Container, Button, Row, Col, InputGroup, Input, InputGroupAddon } from "reactstrap"
import { connect } from "react-redux"
import reactMixin from "react-mixin"
import ReactFireMixin from "reactfire"
import firebase from "firebase"

import AppNavbar from "./AppNavbar.js"
import { incrementCredits } from "../actions/GameActions"
import { gameSelector } from "../stores/selectors/gameSelector"

// Initialize Firebase
const firebaseConf = {
	apiKey: "AIzaSyDcvzEJoJb1w_qJcC_fEO3Xa7e_HNCreD8",
	authDomain: "dopamine-simulator.firebaseapp.com",
	databaseURL: "https://dopamine-simulator.firebaseio.com",
	storageBucket: "dopamine-simulator.appspot.com",
	messagingSenderId: "797610196288",
}
firebase.initializeApp(firebaseConf)

class App extends React.Component {
	constructor(props) {

		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
		console.log(this)
		this.state = {
			text: "fap",
		}
	}

	componentWillMount() { // run once before rednering
		const ref = firebase.database().ref("items")
		this.bindAsArray(ref, "items")
		console.log(this.state)
	}

	handleSubmit(e) {
		e.preventDefault()
		this.firebaseRefs.items.push({
			text: this.state.text,
		})
		this.setState({ text: "" })
	}

	handleClick() {
		this.props.dispatch(incrementCredits(10))
	}

	render() {
		const { game } = this.props

		return (
			<Container>
				<AppNavbar game={game} />
				<Row>
					<Col xs="12">
						<InputGroup>
							<InputGroupAddon>@</InputGroupAddon>
							<Input placeholder="text" value={this.state.text} />
						</InputGroup>
						<Button color="primary" onClick={this.handleSubmit}>Submit</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}

App.propTypes = {
	game: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}

reactMixin(App.prototype, ReactFireMixin)

export default connect((state) => {
	return {
		game: gameSelector(state),
	}
})(App)

