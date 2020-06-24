import React, { Component } from "react";
import AllPolls from "./allPolls";
import CreatePoll from "./createPoll";
import ProfileHeader from "./profileHeader";
import GetTrends from "./getTrends"

export default class Homepage extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-md-3">
					<ProfileHeader />
				</div>
				<div className="col-md-6">
					<CreatePoll />
					<AllPolls />
				</div>
				<div className="col-md-3">
					<GetTrends />
				</div>
			</div>
		);
	}
}
