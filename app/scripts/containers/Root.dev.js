import React from "react"
import { Provider } from "react-redux"
import { Router, Route, hashHistory } from "react-router"

import App from "./Application.js"
import DevTools from "./DevTools"

class Root extends React.Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<div>
					<Router history={hashHistory}>
						<Route path="/" component={App} />
					</Router>
					{process.env.NODE_ENV !== "production" &&
						<DevTools />
					}
				</div>
			</Provider>
		)
	}
}

Root.propTypes = {
	store: React.PropTypes.object,
}

export default Root
