import React from "react"
import firebase from "firebase"
import { Navbar as BsNavbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"

import LoginModal from "./LoginModal"

export default class Navbar extends React.Component {
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

	handleLogout(e) {
		e.preventDefault()
		firebase.auth().signOut()
	}

	render() {
		const { user, dispatch } = this.props

		return (
			<BsNavbar color="faded" light>
				<NavbarBrand>SpeakMind</NavbarBrand>

				<Nav className="float-xs-right" navbar>
					<NavItem>
						{!user.uid &&
							<NavLink href="#" onClick={this.toggleLoginModal}>Sign in</NavLink>
						}
						{user.uid &&
							<NavLink href="#" onClick={this.handleLogout}>Sign out ({user.displayName})</NavLink>
						}
					</NavItem>
				</Nav>

				<LoginModal
					open={this.state.loginModal}
					toggle={this.toggleLoginModal}
					onlineUsers={this.props.onlineUsers}
					dispatch={this.props.dispatch}
				/>
			</BsNavbar>
		)
	}
}

Navbar.propTypes = {
	user: React.PropTypes.object,
	onlineUsers: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}
