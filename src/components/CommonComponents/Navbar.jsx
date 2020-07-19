import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavbarToggler,
	MDBCollapse,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
	MDBIcon,
} from "mdbreact";
import { Divider } from "antd";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/userAuthentication"
import { useHistory } from "react-router";
import { viewClickedUserById } from "../../store/actions/userAuthentication"

const NavbarPage = () => {

	// Internal state
	const [isOpen, setIsOpen] = useState(false)

	// hooks
	const history = useHistory()
	const dispatch = useDispatch()

	const get_user = (id) => {
		dispatch(viewClickedUserById(id))
		history.push({
			pathname: `/user/${id}`
		})
	}

	// for nav toggler
	const toggleCollapse = () => {
		setIsOpen(!isOpen)
	};

	// used to fetch the value of state from the reducer
	const params = useSelector((state) => ({
		authenticated: state.userAuth.isAuthenticated,
		current_user: state.userAuth.user
	}));

	const onSubmit = (e) => {
		// used to dispatch an action that logs a user out
		dispatch(logout());
	};

	const dropdown = (
		<MDBNavItem>
			<MDBDropdown>
				<MDBDropdownToggle nav caret className="text-light">
					{/* <MDBIcon icon="user" className="text-light" /> */}
					<div className="d-md-inline mx-2 font-weight-bold">{params.authenticated ? params.current_user.user.username : ""}</div>
				</MDBDropdownToggle>
				<MDBDropdownMenu className="dropdown-default text-light">
					<MDBDropdownItem onClick={() => { get_user(params.current_user.user.id) }}>View Profile</MDBDropdownItem>
					{/* <MDBDropdownItem href="#!">My polls</MDBDropdownItem> */}
					{/* <MDBDropdownItem href="#!">My inbox</MDBDropdownItem> */}

					<MDBDropdownItem onClick={onSubmit}>
						Logout
					</MDBDropdownItem>
				</MDBDropdownMenu>
			</MDBDropdown>
		</MDBNavItem>
	)
	const not_signed_in = (
		<MDBNavItem>
			<Link to="/login" className="text-light font-weight-bold">
				LOGIN
			</Link>
		</MDBNavItem>
	)

	return (
		<MDBNavbar
			style={defaultColor.background_color}
			dark
			expand="md"
			fixed="top">
			<div className="container">
				<MDBNavbarBrand>
					<Link to="/" className="text-light">
						PollSurvey
					</Link>

				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={toggleCollapse} />
				<MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>

					<MDBNavbarNav right>
						{params.authenticated === true ? dropdown : not_signed_in}

					</MDBNavbarNav>
				</MDBCollapse>
			</div>
		</MDBNavbar>
	);
}

export default NavbarPage;
