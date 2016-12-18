import React from "react"
import { Navbar as BsNavbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"

import LoginModal from "./LoginModal"

export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginModal: false,
		}
		this.toggleLoginModal = this.toggleLoginModal.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	toggleLoginModal() {
		this.setState({
			loginModal: !this.state.loginModal,
		})
	}

	handleLogin(email, password) {
		this.props.onLogin(email, password)
		this.toggleLoginModal()
	}

	handleLogout(e) {
		e.preventDefault()
		this.props.onLogout()
	}

	render() {
		const { user } = this.props

		return (
			<BsNavbar color="faded" light>
				<NavbarBrand href="/">Dopasim</NavbarBrand>

				<Nav className="float-xs-right" navbar>
					<NavItem>
						{!user.uid &&
							<NavLink href="#" onClick={this.toggleLoginModal}>Sign in</NavLink>
						}
						{user.uid &&
							<NavLink href="#" onClick={this.handleLogout}>Sign out</NavLink>
						}
					</NavItem>
				</Nav>

				<LoginModal open={this.state.loginModal} toggle={this.toggleLoginModal} onLogin={this.handleLogin} />
			</BsNavbar>
		)
	}
}

Navbar.propTypes = {
	user: React.PropTypes.object,
	onLogin: React.PropTypes.func,
	onLogout: React.PropTypes.func,
}
