import React from "react"
import { Container, Button, Row, Col } from "reactstrap"
import { connect } from "react-redux"

import AppNavbar from "./AppNavbar.js"
import { incrementCredits } from "../actions/GameActions"
import { gameSelector } from "../stores/selectors/gameSelector"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
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
						<Button bsStyle="primary" onClick={this.handleClick}>Bake</Button>
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

export default connect((state) => {
	return {
		game: gameSelector(state),
	}
})(App)

