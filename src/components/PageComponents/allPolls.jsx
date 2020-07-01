import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import "../StyleComponents/AllPolls.css"
import { useSelector, useDispatch } from "react-redux"
import { get_single_poll, get_polls, post_currentuser_vote } from "../../store/actions/poll_action"
import { viewClickedUserById, post_likepost } from "../../store/actions/userAuthentication"
import { useHistory } from "react-router";

const AllPolls = () => {

	const { likes, setLikes } = useState([])

	const params = useSelector((state) => ({
		all: state.polls.poll,
		votedb_error: state.polls.vote_error,
		user: state.userAuth.user
	}));

	const dispatch = useDispatch();
	// const dispatch_single_poll = useDispatch();
	// const dispatch_get_user = useDispatch()
	// const dispatch_vote = useDispatch()
	// const dispatch_like_poll = useDispatch()
	const history = useHistory()


	// used to dispatch an action that gets all polls from the database
	useEffect(() => {
		dispatch(get_polls())
		console.log("poll loaded")
	}, [])


	// used to dispatch an action that gets all polls from the database
	useEffect(() => {
		console.log("Poll updated")
	}, [params.all])

	// useEffect(() => {
	// 	console.log("Get user likes updated")
	// 	get_user_likes()
	// }, [])


	// const get_user_likes = () => {
	// 	return params.user.likes.map(like => {
	// 		return (
	// 			<div key={like.id}>
	// 				{like.question}
	// 			</div>
	// 		)
	// 	})

	// }
	const get_user_likes = () => {
		const like_array = []
		params.user.likes.map(like => {

			like_array.push(like.question)

		})
		return like_array

	}

	// used to dispatch an action to get a single poll and then change the route to 
	// the id of the poll
	const get_single_page = (id) => {
		dispatch(get_single_poll(id))
		history.push({
			pathname: `/${id}`
		})
	}

	// used to dipatch an action that that gets the profile of the clicked user and
	// then change the route to user profile page
	const get_user = (id) => {
		dispatch(viewClickedUserById(id))
		history.push({
			pathname: `/user/${id}`
		})
	}

	// used to dispatch an action that allows an authenticated user to vote on a particular choice
	const cast_vote = (poll_id, choice_id) => {
		dispatch(post_currentuser_vote({ poll_id, choice_id }))
	}

	const like_poll = (poll_id) => {
		dispatch(post_likepost({ user_id: params.user.user.id, poll_id }))
	}



	return (
		<div className="mt-5">
			{
				params.all.map(poll => (
					<div key={poll.id} >
						<div className="mb-3 card" style={{ borderColor: "lightblue" }} >
							<div className="card-body poll" style={{ borderLeft: "1px solid #F0F0F0", position: "relative" }}>
								<div>
									<span className="font-weight-bold pollhover" onClick={() => get_user(poll.poll_creator_id)}>
										{poll.poll_creator_fullname} @{poll.poll_creator}
									</span>
								</div>
								<p className="card-title pollhover" onClick={() => get_single_page(poll.id)}>{poll.poll_question}</p>
								<div className="card-text">
									{poll.poll_has_expired ?
										<div>
											<span className="text-danger">This poll has expired</span>
											<div className="row">
												{
													poll.choices ? poll.choices.map(choice => {
														return (

															<div className="col-md-6 my-1" key={choice.id}>
																<button disabled="disabled" className="form-control bg-secondary" data-toggle="tooltip" data-placement="top" title="Can't vote on your own poll">
																	{choice.choice_name} {choice.choice_vote_count}
																</button>
															</div>
														)
													}) : ""
												}
											</div>
										</div> :
										<div className="row">
											{
												poll.choices ? poll.choices.map(choice => {
													return params.user.username === poll.poll_creator ?

														<div className="col-md-6 my-1" key={choice.id}>
															<button disabled="disabled" className="form-control bg-secondary" data-toggle="tooltip" data-placement="top" title="Can't vote on your own poll">
																{choice.choice_name} {choice.choice_vote_count}
															</button>
														</div>

														:
														<div className="col-md-6 my-1" key={choice.id}>


															<button className="form-control" style={defaultColor.background_color}
																onClick={() => cast_vote(poll.id, choice.id)}>
																{choice.choice_name} {choice.choice_vote_count}
															</button>
														</div>
												}) : ""
											}
										</div>
									}
								</div>
								<div className="d-flex justify-content-between">
									<span className="text-success">Total Votes : {poll.vote_count}</span>
									<span className="text-success">Poll expires on : {poll.poll_expiration_date}</span>
								</div>
								<small className="text-danger">You can't vote on your own poll</small>
								<div className="mt-4">
									<span className="mr-5"><i class="fa fa-book" ></i> bookmark</span>
									{
										// get_user_likes.indexOf(poll.question) !== -1 ?
										get_user_likes().indexOf(poll.poll_question) !== -1 ?
											<span><i className="fa fa-heart text-danger" ></i>Liked</span>
											:
											<span
												onClick={() => like_poll(poll.id, params.user.id)} className="pollhover"><i className="fa fa-heart" ></i>Like</span>


									}<br />

									<h1>{get_user_likes().indexOf(poll.poll_question)}</h1>


								</div>
							</div>
						</div><hr />
					</div>
				))

			}
		</div >
	);

}
export default AllPolls;
