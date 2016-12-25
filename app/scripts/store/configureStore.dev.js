import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducers from "../reducers"
import DevTools from "../containers/DevTools"

export default function configureStore() {
	console.log("configuring store for dev")
	const store = createStore(reducers,
		compose(
			applyMiddleware(thunk),
			DevTools.instrument(),
		),
	)
	return store
}
