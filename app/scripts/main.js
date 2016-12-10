import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, hashHistory } from "react-router"
import immutable from "immutable"
import installDevTools from "immutable-devtools"

import App from "./components/App.js"

installDevTools(immutable)

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App} />
	</Router>
), document.getElementById("app"))
