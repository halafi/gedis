import React from "react"
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"

export default class AppNavbar extends React.Component {
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Overview</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">New Goal</NavItem>
                        <NavDropdown eventKey={2} title="Help" id="basic-nav-dropdown">
                            <MenuItem disabled eventKey={2.1}>Action</MenuItem>
                            <MenuItem disabled eventKey={2.2}>Faq</MenuItem>
                            <MenuItem disabled eventKey={2.3}>Instructions</MenuItem>
                            <MenuItem divider/>
                            <MenuItem disabled eventKey={2.3}>Contact</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem disabled eventKey={1} href="#">Import</NavItem>
                        <NavItem disabled eventKey={2} href="#">Export</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
