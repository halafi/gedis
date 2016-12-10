import React from "react"
import { createStore } from "redux"
import { Button } from "react-bootstrap"
import reducers from "../stores/reducers"

import AppNavbar from "./AppNavbar.js"
import { incrementCredits } from "../actions/GameActions"

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(reducers)
const dispatch = store.dispatch

console.log(store)

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		store.dispatch(incrementCredits(10))
		this.forceUpdate() // TODO remove
	}

	render() {
		return (
			<div>
				<AppNavbar game={store.getState()} />
				<div className="container">
					<Button bsStyle="primary" onClick={this.handleClick}>Action</Button>
				</div>
			</div>
		)
	}
}
