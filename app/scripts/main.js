import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import { Router, Route, hashHistory } from "react-router"
import immutable from "immutable"
import installDevTools from "immutable-devtools"

import App from "./components/App.js"
import reducers from "./stores/reducers"


// Install immutable chrome dev tools
installDevTools(immutable)

// Create redux store
const store = createStore(reducers)

ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App} />
		</Router>
	</Provider>
), document.getElementById("app"))
