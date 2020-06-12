import React from "react";
import profileImage from "../../assets/images/author.jpg";
import { MDBIcon } from "mdbreact";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { useSelector } from "react-redux"

const ProfileHeader = () => {

	const params = useSelector((state) => ({
		current_user: state.userAuth.user
	}));

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
						{params.current_user.username}
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
export default ProfileHeader;
