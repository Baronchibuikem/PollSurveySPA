import React from "react";
import profileImage from "../../assets/images/no-profile-image.jpg";
// import { MDBIcon } from "mdbreact";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { useSelector } from "react-redux"

const ProfileHeader = () => {

	const params = useSelector((state) => ({
		current_user: state.userAuth.user
	}));

	return (
		<div className="d-none d-sm-block" style={defaultColor.profile_header}>

			<div className="">
				{
					params.current_user.user.image === null ?
						<div>
							<img
								src={profileImage}
								alt="profile-img"
								width="100%"
							/>
						</div>
						:
						<img
							src={params.current_user.user.image_url}
							alt="profile-img"
							width="100%"
						/>
				}

			</div>
			<div className="text-center my-3">
				<span className="text-light">
					<i
						className="fa fa-eye text-light"
						data-toggle="tooltip"
						title="view profile"></i>
					{params.current_user.user.username}
				</span>
			</div>
			<div className="text-center my-3">
				<span className="text-light">
					{params.current_user.user.bio}
				</span>
			</div>
			<hr style={{ borderTop: "1px solid white" }} />
			<div className="d-flex text-dark py-2 justify-content-center">
				<span className="mr-3 text-light">
					Followers {params.current_user.followers.map(follower => (follower.total_followers_no))}
					<br />
					{/* <MDBIcon icon="user" className="text-light" /> */}
				</span>
				<span className="mr-3 text-light">
					Following {params.current_user.followed.map(followed => (followed.total_followed_no))}
					<br />
					{/* <MDBIcon icon="user" className="text-light" /> */}
				</span>
				<span className="text-light">
					Polls {params.current_user.polls.length}
					<br />
					{/* <MDBIcon icon="list" className="text-light" /> */}
				</span>
			</div>

		</div>
	);
}
export default ProfileHeader;
