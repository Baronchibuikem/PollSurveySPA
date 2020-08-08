import React, { Component } from "react";
import AllPolls from "./allPolls";
import CreatePoll from "./createPoll";
import ProfileHeader from "./profileHeader";
import GetTrends from "./getTrends"
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

export default class Homepage extends Component {
	render() {
		return (
			<div className="row container mx-auto">
				<div className="col-md-3">
					<ErrorBoundary>
						<ProfileHeader />
					</ErrorBoundary>
				</div>
				<div className="col-md-6">
					<ErrorBoundary>
						<CreatePoll />
					</ErrorBoundary>
					<ErrorBoundary>
						<AllPolls />
					</ErrorBoundary>
				</div>
				<div className="col-md-3">
					<GetTrends />
				</div>
			</div>
		);
	}
}
