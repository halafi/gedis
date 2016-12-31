import React from "react"
import { Provider } from "react-redux"

import App from "./Application.js"

class Root extends React.Component {
	render() {
		const { store } = this.props
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

Root.propTypes = {
	store: React.PropTypes.object,
}

export default Root
