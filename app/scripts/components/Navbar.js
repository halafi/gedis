import React from "react"
import firebase from "firebase"
import { Navbar as BsNavbar, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

import LoginModal from "./LoginModal"
import EditProfileModal from "./EditProfileModal"

export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginModal: false,
			editProfileModal: false,
			dropdownOpen: false,
		}
		this.toggleLoginModal = this.toggleLoginModal.bind(this)
		this.toggleEditProfileModal = this.toggleEditProfileModal.bind(this)
		this.toggleDropdown = this.toggleDropdown.bind(this)
	}

	toggleLoginModal(e) {
		if (e) e.preventDefault()
		this.setState({
			loginModal: !this.state.loginModal,
		})
	}

	toggleEditProfileModal(e) {
		if (e) e.preventDefault()
		this.setState({
			editProfileModal: !this.state.editProfileModal,
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
		const { user, onlineUsers, dispatch } = this.props
		const { dropdownOpen, loginModal, editProfileModal } = this.state

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
								<img className="userAvatar" src={user.photoURL || "images/default_avatar.png"}/>
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem href="#" onClick={this.toggleEditProfileModal}>Edit Profile</DropdownItem>
								<DropdownItem divider />
								<DropdownItem href="#" onClick={this.handleLogout}>Log Out</DropdownItem>
							</DropdownMenu>
						</NavDropdown>
					}
				</Nav>

				<LoginModal
					open={loginModal}
					toggle={this.toggleLoginModal}
					onlineUsers={onlineUsers}
					dispatch={dispatch}
				/>
				<EditProfileModal
					open={editProfileModal}
					toggle={this.toggleEditProfileModal}
					user={user}
					onlineUsers={onlineUsers}
					dispatch={dispatch}
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
