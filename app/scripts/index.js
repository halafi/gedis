import React from "react"
import ReactDOM from "react-dom"
import immutable from "immutable"
import installDevTools from "immutable-devtools"
import moment from "moment"

import configureStore from "./store/configureStore"
import configureFirebase from "./firebase/configureFirebase"
import Root from "./containers/Root"

require("./../styles/main.scss")

installDevTools(immutable)
configureFirebase()

const store = configureStore()

moment.locale(navigator.language)

ReactDOM.render((
	<Root store={store} />
), document.getElementById("app"))
