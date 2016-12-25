import React from "react"
import ReactDOM from "react-dom"
import immutable from "immutable"
import installDevTools from "immutable-devtools"

import configureStore from "./store/configureStore"
import configureFirebase from "./firebase/configureFirebase"
import Root from "./containers/Root"

require("./main.scss")

installDevTools(immutable)
configureFirebase()

const store = configureStore()

ReactDOM.render((
	<Root store={store} />
), document.getElementById("app"))
