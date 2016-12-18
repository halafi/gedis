import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import { Router, Route, hashHistory } from "react-router"
import immutable from "immutable"
import installDevTools from "immutable-devtools"
import firebase from "firebase"

import App from "./containers/App.js"
import reducers from "./stores/reducers"

// Initialize Firebase
const firebaseConf = {
	apiKey: "AIzaSyDcvzEJoJb1w_qJcC_fEO3Xa7e_HNCreD8",
	authDomain: "dopamine-simulator.firebaseapp.com",
	databaseURL: "https://dopamine-simulator.firebaseio.com",
	storageBucket: "dopamine-simulator.appspot.com",
	messagingSenderId: "797610196288",
}
firebase.initializeApp(firebaseConf)

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
