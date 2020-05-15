import React, { Component } from "react";
import {
	MDBContainer,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink
} from "mdbreact";
import Login from "../PagesComponent/LoginPage";
import Signup from "../PagesComponent/SignupPage";
import AuthImage from "../../assets/images/loginImg.png";

class TabsDefault extends Component {
	state = {
		activeItem: "1"
		// show: true
	};

	toggle = tab => e => {
		if (this.state.activeItem !== tab) {
			this.setState({
				activeItem: tab
			});
		}
	};

	render() {
		return (
			<MDBContainer className="mt-5">
				<div className="row">
					<div className="col-md-6 col-sm-12">
						<img
							src={AuthImage}
							alt="login"
							width="100%"
							height="100%"
							className="image-responsive"
						/>
					</div>
					<div className="col-md-6 col-sm-12">
						<MDBNav className="nav-tabs mt-5 pt-5">
							<MDBNavItem>
								<MDBNavLink
									link
									to="#"
									active={this.state.activeItem === "1"}
									onClick={this.toggle("1")}
									role="tab"
									style={{
										minWidth: "15vw",
										fontSize: "25px",
										textAlign: "center"
									}}>
									Login
								</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink
									link
									to="#"
									active={this.state.activeItem === "2"}
									onClick={this.toggle("2")}
									role="tab"
									style={{
										minWidth: "15vw",
										fontSize: "25px",
										textAlign: "center"
									}}>
									Signup
								</MDBNavLink>
							</MDBNavItem>
						</MDBNav>
						<MDBTabContent activeItem={this.state.activeItem}>
							<MDBTabPane tabId="1" role="tabpanel">
								<Login />
							</MDBTabPane>
							<MDBTabPane tabId="2" role="tabpanel">
								<Signup />
							</MDBTabPane>
						</MDBTabContent>
					</div>
				</div>
			</MDBContainer>
		);
	}
}
export default TabsDefault;
