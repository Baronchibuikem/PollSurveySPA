import React, { Component } from "react";
import AllPolls from "./allPolls";
import ProfileHeader from "./profileHeader";
import GetTrends from "./getTrends";
import CreatePoll from "./createPoll";
import BaseRouter from "../../routes";

export default class Homepage extends Component {
	render() {
		return (
			<div>
				<CreatePoll />
				<hr />
				<AllPolls />
			</div>
		);
	}
}
