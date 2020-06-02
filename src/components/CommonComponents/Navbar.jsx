import React, { Component } from "react";
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
	MDBIcon,
	MDBFormInline,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { Divider } from "antd";
import { defaultColor, Logger } from "../UtilityComponents/HelperFunctions";

class NavbarPage extends Component {
	state = {
		isOpen: false,
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<MDBNavbar
				style={defaultColor.background_color}
				dark
				expand="md"
				fixed="top">
				<div className="container">
					<MDBNavbarBrand>
						<strong className="text-light">LOGO</strong>
					</MDBNavbarBrand>
					<MDBNavbarToggler onClick={this.toggleCollapse} />
					<MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
						<MDBNavbarNav left></MDBNavbarNav>
						<MDBNavbarNav right>
							<MDBNavItem>
								<MDBFormInline waves>
									<div className="md-form my-0">
										<input
											className="form-control mr-sm-2"
											type="text"
											placeholder="Search"
											aria-label="Search"
										/>
									</div>
								</MDBFormInline>
							</MDBNavItem>

							<MDBNavItem>
								<MDBDropdown>
									<MDBDropdownToggle nav caret className="text-light">
										<MDBIcon icon="user" className="text-light" />
										<div className="d-none d-md-inline mx-2">Username</div>
									</MDBDropdownToggle>
									<MDBDropdownMenu className="dropdown-default text-light">
										<MDBDropdownItem to="/">View Profile</MDBDropdownItem>
										<MDBDropdownItem href="#!">My polls</MDBDropdownItem>
										<MDBDropdownItem href="#!">My inbox</MDBDropdownItem>
										<Divider></Divider>
										<MDBDropdownItem href="#!">Logout</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							</MDBNavItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</div>
			</MDBNavbar>
		);
	}
}

export default NavbarPage;
