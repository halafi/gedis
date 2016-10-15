import React from "react"
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap"

export default class AppNavbar extends React.Component {
    render() {
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
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Help" id="basic-nav-dropdown">
                            <MenuItem disabled eventKey={3.1}>Action</MenuItem>
                            <MenuItem disabled eventKey={3.2}>Faq</MenuItem>
                            <MenuItem disabled eventKey={3.3}>Instructions</MenuItem>
                            <MenuItem divider/>
                            <MenuItem disabled eventKey={3.3}>Contact</MenuItem>
                        </NavDropdown>
                        <NavItem disabled eventKey={1} href="#">Import</NavItem>
                        <NavItem disabled eventKey={2} href="#">Export</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}