import React from "react"
import firebase from "firebase"
import { Navbar as BsNavbar, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

import LoginModal from "./LoginModal"

export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginModal: false,
			dropdownOpen: false,
		}
		this.toggleLoginModal = this.toggleLoginModal.bind(this)
		this.toggleDropdown = this.toggleDropdown.bind(this)
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

	toggleDropdown() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		})
	}

	render() {
		const { user } = this.props
		const { dropdownOpen } = this.state

		return (
			<BsNavbar color="faded" light>
				<NavbarBrand>SpeakMind</NavbarBrand>

				<Nav className="float-xs-right" navbar>
					{!user.uid &&
					<NavItem>
						<NavLink href="#" onClick={this.toggleLoginModal}>Log in</NavLink>
					</NavItem>
					}
					{user.uid &&
						<NavDropdown size="sm" isOpen={dropdownOpen} toggle={this.toggleDropdown}>
							<DropdownToggle nav>
								<img className="userAvatar" src="images/default_avatar.png"/>
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem disabled>Edit Profile</DropdownItem>
								<DropdownItem disabled>Account Settings</DropdownItem>
								<DropdownItem divider />
								<DropdownItem href="#" onClick={this.handleLogout}>Log Out</DropdownItem>
							</DropdownMenu>
						</NavDropdown>
					}
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
