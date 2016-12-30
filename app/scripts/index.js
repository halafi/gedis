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

console.log(moment.locale()) // TODO check if is correct

ReactDOM.render((
	<Root store={store} />
), document.getElementById("app"))
