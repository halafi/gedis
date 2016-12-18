import React from "react"
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"

import LoginModal from "./LoginModal"

export default class AppNavbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginModal: false,
		}
		this.toggleLoginModal = this.toggleLoginModal.bind(this)
	}

	toggleLoginModal(e) {
		if (e) e.preventDefault()
		this.setState({
			loginModal: !this.state.loginModal,
		})
	}

	render() {
		return (
			<Navbar color="faded" light>
				<NavbarBrand href="/">Dopasim</NavbarBrand>

				<Nav className="float-xs-right" navbar>
					<NavItem>
						<NavLink href onClick={this.toggleLoginModal}>Sign in</NavLink>
					</NavItem>
				</Nav>

				<LoginModal open={this.state.loginModal} toggle={this.toggleLoginModal} />
			</Navbar>
		)
	}
}
