import React from "react"
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"

export default class AppNavbar extends React.Component {
    constructor() {
        super()
        this.work = this.work.bind(this)
    }
    work() {
    }
    render() {
        const { game } = this.props
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">My farm</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Build</NavItem>
                        <NavItem eventKey={2} href="#">Research</NavItem>
                        <NavItem eventKey={3} onClick={this.work}>Work</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>Credits: {game.gameReducer.credits}</NavItem>
                        {/*<NavDropdown disabled eventKey={3} title="Help" id="basic-nav-dropdown">*/}
                            {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
                            {/*<MenuItem eventKey={3.2}>Faq</MenuItem>*/}
                            {/*<MenuItem eventKey={3.3}>Instructions</MenuItem>*/}
                            {/*<MenuItem divider/>*/}
                            {/*<MenuItem eventKey={3.3}>Contact</MenuItem>*/}
                        {/*</NavDropdown>*/}
                        {/*<NavItem disabled eventKey={1} href="#">Import</NavItem>*/}
                        {/*<NavItem disabled eventKey={2} href="#">Export</NavItem>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}