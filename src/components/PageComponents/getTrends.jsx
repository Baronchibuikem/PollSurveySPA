import React, { Component } from "react";
import PropTypes from "prop-types";

class getTrends extends Component {
	static propTypes = {
		prop: PropTypes,
	};

	render() {
		return (
			<div className="d-none d-sm-block">
				<h3>Top Trending Polls</h3>
			</div>
		);
	}
}
export default getTrends;
