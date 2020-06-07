import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultColor } from "../UtilityComponents/HelperFunctions";

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
	focusActivated = (e) => {
		this.setState({
			showForm: true,
			question: e.target.value,
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
			<div className="d-flex">
				<input
					type="text"
					placeholder="Pleae enter the choices"
					className="form-control"
					style={{ borderRadius: "5px" }}
					value={this.state.option}
					readOnly={!this.state.question}
					onChange={(e) => {
						this.setState({
							option: e.target.value,
						});
					}}
				/>

				<button
					type="button"
					onClick={this.AddOption}
					disabled={!this.state.option}
					className="form-control w-25 b"
					style={
						this.state.option
							? defaultColor.background_color
							: { backgroundColor: "grey" }
					}>
					Add
				</button>
			</div>
		);
		return (
			<div>
				<form action="">
					<div>
						<textarea
							style={{ borderRadius: "5px" }}
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
					<div className="mt-3">{this.state.showForm ? choiceform : ""}</div>
					<div className="mt-3">
						{this.state.showForm ? (
							<input
								type="date"
								className="form-control is-rounded"
								style={{ borderRadius: "5px" }}
								disabled={this.state.options.length < 1}
							/>
						) : (
								""
							)}
					</div>
					<div>
						{this.state.showForm ? (
							<button
								disabled={!this.state.question && !this.state.options && !this.state.date}
								className="form-control mt-3"
								style={
									this.state.question
										? defaultColor.background_color
										: { backgroundColor: "grey" }
								}>
								Submit
							</button>
						) : (
								""
							)}
					</div>
				</form>
			</div>
		);
	}
}
export default createPoll;
