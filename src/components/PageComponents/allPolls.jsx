import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import "../StyleComponents/AllPolls.css"
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { get_single_poll, get_polls } from "../../store/actions/poll_action"
import { useHistory } from "react-router";

const AllPolls = () => {


	const { id, setId } = useState("")
	const params = useSelector((state) => ({
		all: state.polls.poll,
		token: state.userAuth.token
	}));

	const dispatch_logout = useDispatch();
	const dispatch_single_poll = useDispatch();
	const history = useHistory()


	useEffect(() => {
		const token = params.token
		dispatch_logout(get_polls(token))
	}, [])


	const get_single_page = (id) => {
		dispatch_single_poll(get_single_poll(id))
		history.push({
			pathname: `/${id}`
		})
	}

	return (
		<div className="mt-5">
			{
				params.all.map(poll => (
					<div>
						<div className="mb-3 card" key={poll.id} style={{ borderColor: "lightblue" }} >
							<div className="card-body poll" style={{ borderLeft: "1px solid #F0F0F0", position: "relative" }}>
								<div>
									<span className="font-weight-bold">
										<span className="" onClick={() => get_single_page(poll.id)}>
											{poll.poll_creator_fullname} @{poll.poll_creator}
										</span>
									</span>

								</div>
								<p className="card-title">{poll.poll_question}</p>
								<div className="card-text">
									<div className="row">
										{
											poll.choices ? poll.choices.map(choice => {
												return (

													<div className="col-md-6 my-1">
														<button className="form-control" style={defaultColor.background_color}>
															{choice.choice_name}
														</button>
													</div>

												)
											}) : ""
										}
									</div>
								</div>
							</div>
						</div><hr /></div>
				))
			}
		</div>
	);

}
export default AllPolls;
