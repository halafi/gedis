import React from "react"
import { createStore } from 'redux'
import {Button} from "react-bootstrap"
import reducers from "../stores/reducers"

import AppNavbar from "./AppNavbar.js"

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(reducers)

console.log(store.getState())

export default class App extends React.Component {
    render() {
        return (
            <div>
                <AppNavbar game={store.getState()}/>
                <div className="container">
                    <Button bsStyle="primary">Action</Button>
                </div>
            </div>
        )
    }
}
