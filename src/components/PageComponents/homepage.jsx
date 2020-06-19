import React, { Component } from "react";
import AllPolls from "./allPolls";
import CreatePoll from "./createPoll";

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
