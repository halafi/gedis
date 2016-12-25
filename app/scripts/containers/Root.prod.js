import React from "react"
import { Provider } from "react-redux"
import { Router, Route, hashHistory } from "react-router"

import App from "./Application.js"

class Root extends React.Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={App} />
				</Router>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: React.PropTypes.object,
}

export default Root
