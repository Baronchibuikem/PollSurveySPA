import React, { useState } from "react";
import { func, object } from "prop-types";
import { useDispatch, useSelector } from "react-redux"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { create_poll } from "../../store/actions/poll_action";


const CreatePoll = () => {
	const [question, setQuestion] = useState("");
	const [option, setOption] = useState('')
	const [options, setOptions] = useState([])
	const [initialValue, setInitialValue] = useState([])
	const [showForm, setShowForm] = useState(false)
	const [date, setDate] = useState("")

	const dispatch_createpoll = useDispatch()

	const params = useSelector((state) => ({
		token: state.userAuth.token
	}));


	const focusActivated = (e) => {
		setShowForm(true)
		setQuestion(e.target.value)
	};

	const focusDeactivated = () => {
		setQuestion("")
		setOptions([])
		setShowForm(false)
	};

	// const addOptionToArray = () => {
	// 	setInitialValue.choice_name.push({ choice_name: option })
	// }

	const AddOption = () => {
		// addOptionToArray()
		// const list = setInitialValue.choice_name.concat({ choice_name: option })
		// setInitialValue({ choice_name: list })
		setOptions(options => {
			return [...options, option]
		})
		console.log(initialValue)
		setOption("")
	};

	// For removing an a choice from a poll question when it is being created
	const RemoveOption = o => {
		const newArr = options.filter(opt => opt !== o);
		setOptions(newArr);
		setOption("")

	};

	const submit = (e) => {
		// e.preventDefault()
		const token = params.token
		const choices = options && options.length ? options.map(option => {
			return {
				choice_name: option
			}
		}) : []

		// console.log(question, options, date, "FROM Poll SUBMIT", token)
		dispatch_createpoll(create_poll({ question, choices, date, token }));
		setQuestion("")
		setOption("")
		setOptions([])
		setInitialValue([])
		setDate("")
		setShowForm(false)
	}

	const choiceform = (
		<div className="d-flex">
			<input
				type="text"
				placeholder="Pleae enter the choices"
				className="form-control"
				style={{ borderRadius: "5px" }}
				value={option}
				readOnly={!question}
				onChange={(e) => setOption(e.target.value)}
			/>

			<button
				type="button"
				onClick={AddOption}
				disabled={!option}
				className="form-control w-25 b"
				style={
					option
						? defaultColor.background_color
						: { backgroundColor: "grey" }
				}>
				Add
				</button>
		</div>
	);
	return (
		<div>
			<form>
				<div>
					<textarea
						style={{ borderRadius: "5px" }}
						className="form-control is-rounded"
						onChange={focusActivated}
						placeholder="What is your question"
						maxLength="150"></textarea>
				</div>
				<div className="options">
					{options.map((option, index) => {
						return (
							<div
								key={index}
								style={{ display: "flex", justifyContent: "space-around" }}>
								<h6 onClick={() => RemoveOption(option)}>
									<span className="fa fa-check"></span> {option}
								</h6>
								<small
									className="text-danger"
									onClick={() => RemoveOption(option)}
									style={{ cursor: "pointer" }}>
									X
									</small>
							</div>
						);
					})}
				</div>
				{
					showForm && (
						<div className="mt-3">{choiceform}</div>
					)
				}

				{
					showForm && (
						<div className="mt-3">
							<input
								type="date"
								value={date}
								className="form-control is-rounded"
								style={{ borderRadius: "5px" }}
								disabled={Boolean(!options.length)}
								onChange={(e) => setDate(e.target.value)}
							/>

						</div>
					)
				}

				{
					showForm && (
						<div className="d-flex">
							<button
								onClick={submit}
								disabled={!question && !options && !date}
								className="form-control mt-3"
								style={
									question
										? defaultColor.background_color
										: { backgroundColor: "grey" }
								}>
								Submit
							</button>
							<button
								className="form-control mt-3"
								style={defaultColor.background_color}
								onClick={focusDeactivated}
							>
								Cancel
							</button>
						</div>
					)
				}

			</form>
		</div>
	);
}

CreatePoll.propType = {
	defaultColor: object,
	Logger: func
}

export default CreatePoll;

