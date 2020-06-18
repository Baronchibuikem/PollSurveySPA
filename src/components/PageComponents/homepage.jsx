import React, { Component } from "react";
import AllPolls from "./allPolls";
import ProfileHeader from "./profileHeader";
import GetTrends from "./getTrends";
import CreatePoll from "./createPoll";

export default class homepage extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-3">
						<ProfileHeader />
					</div>
					<div className="col-md-6 min-vh-100" style={{ backgroundColor: "#f6f9fa" }}>
						<CreatePoll />
						<hr />
						<AllPolls />
					</div>
					<div className="col-md-3">
						<GetTrends />
					</div>
				</div>
			</div>
		);
	}
}
