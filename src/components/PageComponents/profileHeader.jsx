import React, { Component } from "react";
import profileImage from "../../assets/images/author.jpg";

class profileHeader extends Component {
	render() {
		const style = {
			imageStyle: {
				display: "block",
				margin: "auto auto",
				maxHeight: "100%",
				borderRadius: "50%"
			},
			divContainer: {
				height: "250px",
				backgroundColor: "#eeee"
			}
		};
		return (
			<div className="d-none d-sm-block">
				<div style={style.divContainer}>
					<div className="pt-3">
						<img
							src={profileImage}
							alt="profile-img"
							className="img-responsive"
							width="50%"
							style={style.imageStyle}
						/>
					</div>
					<div className="text-center mt-3">
						<span>
							<i
								className="fa fa-eye text-dark"
								data-toggle="tooltip"
								title="view profile"></i>
							Username
						</span>
					</div>
					<div className="d-flex text-dark mt-3 justify-content-center">
						<span className="mr-2">Followers</span>
						<span className="mr-2">Following</span>
						<span>Polls</span>
					</div>
				</div>
			</div>
		);
	}
}
export default profileHeader;
