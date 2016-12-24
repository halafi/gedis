import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import { Router, Route, hashHistory } from "react-router"
import immutable from "immutable"
import installDevTools from "immutable-devtools"
import firebase from "firebase"

import App from "./containers/App.js"
import reducers from "./reducers"

const firebaseConf = {
	apiKey: "AIzaSyAu-2VOFmnwWP30cGjzbr41Xm8eu4iGSeo",
	authDomain: "speakmind-50ff8.firebaseapp.com",
	databaseURL: "https://speakmind-50ff8.firebaseio.com",
	storageBucket: "speakmind-50ff8.appspot.com",
	messagingSenderId: "1081217280172",
}
firebase.initializeApp(firebaseConf)

installDevTools(immutable)

const store = createStore(reducers)

ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App} />
		</Router>
	</Provider>
), document.getElementById("app"))
