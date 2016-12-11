import React from "react"
import { Button } from "react-bootstrap"
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
			<div>
				<AppNavbar game={game} />
				<div className="container">
					<Button bsStyle="primary" onClick={this.handleClick}>Action</Button>
				</div>
			</div>
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

