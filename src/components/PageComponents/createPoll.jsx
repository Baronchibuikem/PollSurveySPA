import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultColor, Logger } from "../UtilityComponents/HelperFunctions";

class createPoll extends Component {
	state = {
		question: "",
		option: "",
		options: [],
		initialValue: { choice_text: [{}] },
		choice_type: "TEXT",
		showForm: false,
		date: "",
	};
	static propTypes = {
		defaultColor: PropTypes.object,
		Logger: PropTypes.func,
	};
	focusActivated = () => {
		this.setState({
			showForm: true,
		});
	};

	AddOption = (e) => {
		e.preventDefault();
		let option = this.state.option;
		this.setState((prevState) => {
			return { options: [...prevState.options, option], option: "" };
		});
	};

	// For removing an a choice from a poll question when it is being created
	RemoveOption = (e) => {
		e.preventDefault();
		let array = this.state.options;
		let index = array.indexOf(e);

		array.splice(index, 1);
		this.setState({
			options: array,
		});
	};

	render() {
		const choiceform = (
			<div className="d-flex ">
				<input
					type="text"
					className="form-control"
					style={{ borderRadius: "10px" }}
					value={this.state.option}
					onChange={(e) => {
						this.setState({
							option: e.target.value,
						});
					}}
				/>
				<button
					type="button"
					onClick={this.AddOption}
					className="form-control w-25 b"
					style={defaultColor.background_color}>
					Add
				</button>
			</div>
		);
		return (
			<div>
				<form action="">
					<div>
						<textarea
							style={{ borderRadius: "10px" }}
							className="form-control is-rounded"
							onChange={this.focusActivated}
							placeholder="What is your question"></textarea>
					</div>
					<div className="options">
						{this.state.options.map((option, index) => {
							return (
								<div
									key={index}
									style={{ display: "flex", justifyContent: "space-around" }}>
									<h6 onClick={this.RemoveOption}>
										<span className="fa fa-check"></span> {option}
									</h6>
									<small
										className="text-danger"
										onClick={this.RemoveOption}
										style={{ cursor: "pointer" }}>
										X
									</small>
								</div>
							);
						})}
					</div>
					<div className="mt-2">{this.state.showForm ? choiceform : ""}</div>
				</form>
			</div>
		);
	}
}
export default createPoll;
