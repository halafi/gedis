import React from "react"

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"

export default class AppNavbar extends React.Component {

	render() {
		const { game } = this.props

		return (
			<Navbar color="faded" light>
				<NavbarBrand href="/">My farm</NavbarBrand>

				<Nav className="float-xs-right" navbar>
					<NavItem>
						<NavLink>Credits: {game.credits}</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		)
	}
}
AppNavbar.propTypes = {
	game: React.PropTypes.object,
}
