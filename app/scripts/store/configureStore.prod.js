import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "../reducers"

export default function configureStore() {
	console.log("configuring store for prod")
	const store = createStore(reducers,
		applyMiddleware(thunk),
	)
	return store
}
