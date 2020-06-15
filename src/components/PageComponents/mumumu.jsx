import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultColor } from "../UtilityComponents/HelperFunctions";

const createPoll = () => {
    const [question, setQuestion] = useState("");
    const [option, setOption] = useState('')
    const [options, setOptions] = useState([])
    const [initialValue, setIntialValue] = useState({ choice_text: [{}] })
    const [showForm, setShowForm] = useState(false)
    const [date, setDate] = useState("")

    // 	static propTypes = {
    //     defaultColor: PropTypes.object,
    //     Logger: PropTypes.func,
    // };
    // focusActivated = (e) => {
    //     this.setState({
    //         showForm: true,
    //         question: e.target.value,
    //     });
    // };
    const focusActivated = (e) => {
        setShowForm(true)
        setQuestion(e.target.value)
    };

    const AddOption = (e) => {
        e.preventDefault();
        setOptions(options => {
            return [...options, option]
        })
    };

    // For removing an a choice from a poll question when it is being created
    const RemoveOption = (option) => {
        const [option, ...rest] = options;
        setOptions(rest);
    };

    const submit = (e) => {
        e.preventDefault()
        console.log(e)
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
                onChange={(e) => {
                    this.setState({
                        option: e.target.value,
                    });
                }}
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
            <form onSubmit={submit}>
                <div>
                    <textarea
                        style={{ borderRadius: "5px" }}
                        className="form-control is-rounded"
                        onChange={focusActivated}
                        placeholder="What is your question"></textarea>
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
                                className="form-control is-rounded"
                                style={{ borderRadius: "5px" }}
                                disabled={Boolean(options.length)}
                            />
                        </div>
                    )
                }

                {
                    showForm && (
                        <div className="mt-3">
                            <input
                                type="date"
                                className="form-control is-rounded"
                                style={{ borderRadius: "5px" }}
                                disabled={Boolean(options.length)}
                            />
                        </div>
                    )
                }

                {
                    showForm && (
                        <div className="d-flex">
                            <button
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
                                disabled={!question && !options && !date}
                                className="form-control mt-3"
                                style={
                                    question
                                        ? defaultColor.background_color
                                        : { backgroundColor: "grey" }
                                }>
                                Cancel
							</button>
                        </div>
                    )
                }
                {
                    showForm && (
                        <div className="d-flex">
                            <button
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
                                disabled={!question && !options && !date}
                                className="form-control mt-3"
                                style={
                                    question
                                        ? defaultColor.background_color
                                        : { backgroundColor: "grey" }
                                }>
                                Cancel
							</button>
                        </div>
                    )
                }
            </form>
        </div>
    );
}

export default createPoll;
