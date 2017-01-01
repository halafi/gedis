import React from "react"
import { Navbar as BsNavbar, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import firebase from "firebase"
import moment from "moment"

import LoginModal from "./LoginModal"
import EditProfileModal from "./EditProfileModal"
import * as MessageTypes from "../constants/MessageTypes"

export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loginModal: false,
			editProfileModal: false,
			dropdownOpen: false,
			loginModalTab: "1",
		}
		this.toggleLoginModal = this.toggleLoginModal.bind(this)
		this.toggleEditProfileModal = this.toggleEditProfileModal.bind(this)
		this.toggleDropdown = this.toggleDropdown.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleRegistration = this.handleRegistration.bind(this)
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
		const user = firebase.auth().currentUser
		this.props.messagesRef.push({
			uid: MessageTypes.WELCOME_BOT,
			text: `:balloon: Our deer friend ${user.displayName} has left, may he find what he seeks outside.`,
			time: moment().format(),
		})
		firebase.auth().signOut()
	}

	toggleDropdown() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		})
	}

	handleLogin() {
		this.setState({
			loginModalTab: "1",
		})
		this.toggleLoginModal()
	}

	handleRegistration() {
		this.setState({
			loginModalTab: "2",
		})
		this.toggleLoginModal()
	}

	render() {
		const { user, onlineUsers, dispatch, messagesRef } = this.props
		const { dropdownOpen, loginModal, editProfileModal, loginModalTab } = this.state

		return (
			<BsNavbar color="faded" light>
				<NavbarBrand>SpeakMind</NavbarBrand>

				<Nav className="float-xs-right" navbar>
					{!user.uid &&
						<div>
							<NavItem>
								<NavLink href="#" onClick={this.handleRegistration}>Registration</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#" onClick={this.handleLogin}>Log in</NavLink>
							</NavItem>
						</div>
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
					loginModalTab={loginModalTab}
					messagesRef={messagesRef}
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
	messagesRef: React.PropTypes.object,
	dispatch: React.PropTypes.func,
}
