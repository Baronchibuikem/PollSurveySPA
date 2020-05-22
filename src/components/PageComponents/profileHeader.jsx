import React, { Component } from "react";
import profileImage from "../../assets/images/author.jpg";
import { MDBIcon } from "mdbreact";
import { defaultColor, Logger } from "../UtilityComponents/HelperFunctions";

class profileHeader extends Component {
	render() {
		const style = {
			imageStyle: {
				display: "block",
				margin: "auto auto",
				maxHeight: "100%",
				borderRadius: "50%",
			},
			divContainer: {
				height: "250px",
				backgroundColor: "#eeee",
			},
		};
		return (
			<div className="d-none d-sm-block" style={defaultColor.profile_header}>
				<div>
					<div className="">
						<img
							src={profileImage}
							alt="profile-img"
							className="img-responsive"
							width="100%"
						/>
					</div>
					<div className="text-center my-3">
						<span className="text-light">
							<i
								className="fa fa-eye text-light"
								data-toggle="tooltip"
								title="view profile"></i>
							Username
						</span>
					</div>
					<div className="text-center my-3">
						<span className="text-light">
							A software developer dedicated to becoming world class
						</span>
					</div>
					<hr style={{ borderTop: "1px solid white" }} />
					<div className="d-flex text-dark mt-3 justify-content-center">
						<span className="mr-3 text-light">
							Followers
							<br />
							<MDBIcon icon="user" className="text-light" />
						</span>
						<span className="mr-3 text-light">
							Following
							<br />
							<MDBIcon icon="user" className="text-light" />
						</span>
						<span className="text-light">
							Polls
							<br />
							<MDBIcon icon="list" className="text-light" />
						</span>
					</div>
				</div>
			</div>
		);
	}
}
export default profileHeader;
