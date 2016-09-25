import React from "react"
import {Button} from "react-bootstrap"

import AppNavbar from "./AppNavbar.js"

export default class App extends React.Component {

    render() {
        return (
            <div>
                <AppNavbar />
                <div className="container">
                    <Button bsStyle="primary">Action</Button>
                </div>
            </div>
        )
    }
}
