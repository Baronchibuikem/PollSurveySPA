import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types";
import { get_polls } from "../../store/actions/poll_action"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import "../StyleComponents/AllPolls.css"

const AllPolls = () => {

	const params = useSelector((state) => ({
		all: state.polls.poll,
		token: state.userAuth.token
	}));

	const dispatch_logout = useDispatch();


	useEffect(() => {
		const token = params.token
		dispatch_logout(get_polls(token))
	}, [])

	return (
		<div className="mt-5">
			{
				params.all.map(poll => (
					<div>
						<div className="mb-3" key={poll.id} >
							<div className="card-body poll" style={{ borderLeft: "1px solid #F0F0F0", position: "relative" }}>
								<div>
									<span className="font-weight-bold">{poll.poll_creator_fullname} @{poll.poll_creator}</span>
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
