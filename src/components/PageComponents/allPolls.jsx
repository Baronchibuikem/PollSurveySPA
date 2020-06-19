import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import "../StyleComponents/AllPolls.css"
import { useSelector, useDispatch } from "react-redux"
import { get_single_poll, get_polls } from "../../store/actions/poll_action"
import { getUserById } from "../../store/actions/userAuthentication"
import { useHistory } from "react-router";

const AllPolls = () => {

	const params = useSelector((state) => ({
		all: state.polls.poll,
		token: state.userAuth.token
	}));

	const dispatch_get_polls = useDispatch();
	const dispatch_single_poll = useDispatch();
	const dispatch_get_user = useDispatch()
	const history = useHistory()


	useEffect(() => {
		const token = params.token;
		dispatch_get_polls(get_polls(token))
	}, [])


	const get_single_page = (id) => {
		dispatch_single_poll(get_single_poll(id))
		history.push({
			pathname: `/${id}`
		})
	}

	const get_user = (id) => {
		dispatch_get_user(getUserById(id))
		history.push({
			pathname: `/user/${id}`
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
									<span className="font-weight-bold" onClick={() => get_user(poll.poll_creator_id)}>
										{poll.poll_creator_fullname} @{poll.poll_creator}
									</span>
								</div>
								<p className="card-title pollhover" onClick={() => get_single_page(poll.id)}>{poll.poll_question}</p>
								<div className="card-text">
									<div className="row">
										{
											poll.choices ? poll.choices.map(choice => {
												return (

													<div className="col-md-6 my-1">
														<button className="form-control" style={defaultColor.background_color} key={choice.id}>
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
