import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import "../StyleComponents/AllPolls.css"
import { useSelector, useDispatch } from "react-redux"
import { get_single_poll, get_polls, post_currentuser_vote } from "../../store/actions/poll_action"
import { viewClickedUserById, post_likepost, post_bookmarkpoll } from "../../store/actions/userAuthentication"
import { useHistory } from "react-router";
import profileImage from "../../assets/images/no-profile-image.jpg";


const AllPolls = () => {

	// const { likes, setLikes } = useState([])

	const params = useSelector((state) => ({
		all: state.polls.poll,
		votedb_error: state.polls.vote_error,
		user: state.userAuth.user
	}));

	const dispatch = useDispatch();
	const history = useHistory()


	// used to dispatch an action that gets all polls from the database
	useEffect(() => {
		dispatch(get_polls())
	}, [])


	// used to dispatch an action that gets all polls from the database
	useEffect(() => {
		console.log("Poll updated")
	}, [params.all])


	// here we iterate through all bookmarks in the user state and push the poll question
	// into the bookmarked_poll array
	const get_user_bookmarks = () => {
		const bookmarked_poll = []
		params.user.bookmarks.map(like => {
			bookmarked_poll.push(like.question)
		})
		return bookmarked_poll
	}

	// here we iterate through all likes in the user state and push the poll question
	// into the liked_poll
	const get_user_likes = () => {
		const liked_poll = []
		params.user.likes.map(like => {
			liked_poll.push(like.question)
		})
		return liked_poll
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

	// used to dispatch an action for liking a poll
	const like_poll = (poll_id) => {
		dispatch(post_likepost({ user_id: params.user.user.id, poll_id }))
	}

	// used to dispatch an action for bookmarking a poll
	const bookmark_poll = (poll_id) => {
		dispatch(post_bookmarkpoll({ user_id: params.user.user.id, poll_id }))
	}



	return (
		<div className="mt-5">
			{
				params.all.map(poll => (
					<div key={poll.id} >
						<div className="mb-3 card" style={{ borderColor: "lightblue" }}>
							<div className="card-body poll" style={{ borderLeft: "1px solid #F0F0F0", position: "relative" }}>
								<div className="d-flex">
									{
										poll.image !== null ? <img src={poll.image} alt="poll_creator_image" width="30px" className="mr-3" style={{ borderRadius: "50%" }} />
											: <img src={profileImage} alt="poll_creator_image" width="30px" className="mr-3" style={{ borderRadius: "50%" }} />
									}
									<h6 className="font-weight-bold pollhover mt-2" onClick={() => get_user(poll.poll_creator_id)}>
										{poll.poll_creator_fullname} @{poll.poll_creator}
									</h6>
								</div><hr></hr>
								<p className="card-title pollhover mt-3" onClick={() => get_single_page(poll.id)}>{poll.poll_question}</p>
								<div className="card-text">
									{poll.poll_has_expired ?
										<div>
											<span className="text-danger">This poll has expired</span>
											<div className="row">
												{
													poll.choices ? poll.choices.map(choice => {
														return (

															<div className="col-md-6 my-1" key={choice.id}>
																<button disabled="disabled" className="form-control"
																	data-toggle="tooltip" data-placement="top" title="Voting disabled"
																	style={{ backgroundColor: "grey" }}>
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
													return params.user.user.username === poll.poll_creator ?

														<div className="col-md-6 my-1" key={choice.id}>
															<button disabled="disabled" className="form-control" style={{ backgroundColor: "grey" }}>
																{choice.choice_name} {choice.choice_vote_count}
															</button>
														</div>

														:
														<div className="col-md-6 my-1" key={choice.id}>


															<button className="form-control" style={defaultColor.background_color}
																onClick={() => cast_vote(poll.id, choice.id)}
																data-toggle="tooltip" data-placement="top" title="Click to vote">
																{choice.choice_name} {choice.choice_vote_count}
															</button>
														</div>
												}) : ""
											}
										</div>
									}
								</div>
								<div className="d-flex justify-content-between">
									{
										!poll.poll_has_expired ? <small style={{ color: "#413a76" }}>Voting stops @ ({poll.poll_expiration_date})</small> : ""
									}

								</div>
								{
									params.user.user.username === poll.poll_creator ? <small className="text-danger">You can't vote on your own poll</small> : ""
								}

								<div className="mt-4">
									{
										get_user_bookmarks().indexOf(poll.poll_question) !== -1 ?
											<span className="mr-3"><i className="fa fa-book" style={{ color: "#413a76" }}></i> bookmarked</span>
											:
											<span
												onClick={() => bookmark_poll(poll.id, params.user.id)} className="pollhover mr-3"><i className="fa fa-book" ></i>Bookmark</span>
									}

									{
										get_user_likes().indexOf(poll.poll_question) !== -1 ?
											<span className="mr-3"><i className="fa fa-heart" style={{ color: "#413a76" }} ></i>Liked ({poll.total_likes})</span>
											:
											<span
												onClick={() => like_poll(poll.id, params.user.id)} className="pollhover mr-3"><i className="fa fa-heart" ></i>Like</span>


									}
									{
										poll.vote_count > 0 ? <span style={{ color: "#413a76" }}>Total Votes ({poll.vote_count})</span> : ""
									}

									{/* <h1>{get_user_likes().indexOf(poll.poll_question)}</h1> */}


								</div>
							</div>
						</div>
					</div>
				))

			}
		</div >
	);

}
export default AllPolls;
