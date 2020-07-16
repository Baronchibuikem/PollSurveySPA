import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import ProfileHeader from "./profileHeader"
import GetTrends from "./getTrends"
import "../StyleComponents/AllPolls.css"
import { post_currentuser_vote, post_edit_poll } from "../../store/actions/poll_action"
import { post_likepost, post_bookmarkpoll } from "../../store/actions/userAuthentication"
import profileImage from "../../assets/images/no-profile-image.jpg";

const SinglePoll = () => {

    // data coming from reducer state
    const params = useSelector((state) => ({
        single_poll: state.polls.single_poll,
        user: state.userAuth.user
    }));

    // hooks form 
    const { register, handleSubmit, errors } = useForm();

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


    // used to dispatch an action for liking a poll
    const like_poll = (poll_id) => {
        dispatch(post_likepost({ user_id: params.user.user.id, poll_id }))
    }

    // used to dispatch an action for bookmarking a poll
    const bookmark_poll = (poll_id) => {
        dispatch(post_bookmarkpoll({ user_id: params.user.user.id, poll_id }))
    }

    // used to dispatch an action that gets all polls from the database
    useEffect(() => {
        console.log("single updated")
    }, [params.single_poll])

    const dispatch = useDispatch();

    // used to dispatch an action that allows an authenticated user to vote on a particular choice
    const cast_vote = (poll_id, choice_id) => {
        dispatch(post_currentuser_vote({ poll_id, choice_id }))
    }

    // used to dispatch an action that allows poll owner to edit a particular poll of his/her
    const edit_poll = (data) => {
        dispatch(post_edit_poll({ question: data, poll_id: params.single_poll.id }))
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <ProfileHeader />
            </div>
            <div className="col-md-6">
                <div className="card" style={{ borderColor: "darkblue" }}>
                    <img className="card-img-top" src="holder.js/100x180/" alt="" />
                    <div className="card-body">
                        <div className="d-flex">
                            {
                                params.single_poll.image !== null ? <img src={params.single_poll.image} alt="poll_creator_image" width="30px" className="mr-3" style={{ borderRadius: "50%" }} />
                                    : <img src={profileImage} alt="poll_creator_image" width="30px" className="mr-3" style={{ borderRadius: "50%" }} />
                            }
                            <h6 className="card-title mr-5 mt-2">{params.single_poll.poll_creator_fullname} @{params.single_poll.poll_creator}</h6>
                            {params.user.user.username === params.single_poll.poll_creator ?
                                <span className="font-weight-bold pollhover mt-2" style={defaultColor.text_color} data-toggle="modal" data-target="#modelId">Edit Poll</span>
                                : ""}

                            {/* modal begins */}
                            <form >
                                <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Edit this poll</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="container-fluid">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="question"
                                                        placeholder={params.single_poll.poll_question}
                                                        ref={register({ required: true })} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary"
                                                    onSubmit={handleSubmit(edit_poll)}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* modal ends */}
                        </div><hr />
                        <p className="card-text">{params.single_poll.poll_question}</p>
                        {params.single_poll.poll_has_expired ?
                            <div>
                                <span className="text-danger">Voting has ended on this poll choices</span>
                                {params.single_poll.choices.map((choice) => {
                                    return (
                                        <button key={choice.id} disabled="disabled"
                                            style={defaultColor.disable_button_color} className="form-control my-2">
                                            {choice.choice_name} {choice.choice_vote_count}
                                        </button>

                                    )
                                })}
                            </div>
                            :
                            <div>
                                {params.single_poll.choices.map((choice) => {
                                    return params.user.user.username === params.single_poll.poll_creator ?
                                        <button key={choice.id} disabled="disabled"
                                            style={defaultColor.disable_button_color} className="form-control my-2" data-toggle="tooltip" data-placement="top" title="Can't vote on your own poll">
                                            {choice.choice_name} {choice.choice_vote_count}
                                        </button>
                                        :
                                        <button className="form-control my-2" style={defaultColor.background_color} key={choice.id}
                                            onClick={() => cast_vote(params.single_poll.id, choice.id)}>
                                            {choice.choice_name} {choice.choice_vote_count}
                                        </button>
                                })}
                                {params.user.user.username === params.single_poll.poll_creator ? <p className="text-danger">You can't vote on your own poll</p> : ""}
                            </div>
                        }


                        <div className="mt-4">
                            {
                                get_user_bookmarks().indexOf(params.single_poll.poll_question) !== -1 ?
                                    <span className="mr-3"><i class="fa fa-book" style={{ color: "#413a76" }}></i> bookmarked</span>
                                    :
                                    <span
                                        onClick={() => bookmark_poll(params.single_poll.id, params.user.user.id)} className="pollhover mr-3"><i className="fa fa-book" ></i>Bookmark</span>
                            }

                            {
                                get_user_likes().indexOf(params.single_poll.poll_question) !== -1 ?
                                    <span className="mr-3"><i className="fa fa-heart" style={{ color: "#413a76" }} ></i>Liked ({params.single_poll.total_likes})</span>
                                    :
                                    <span
                                        onClick={() => like_poll(params.single_poll.id, params.user.user.id)} className="pollhover mr-3"><i className="fa fa-heart" ></i>Like</span>


                            }
                            {
                                params.single_poll.vote_count > 0 ? <span style={{ color: "#413a76" }}>Total Votes ({params.single_poll.vote_count})</span> : ""
                            }

                            {/* <h1>{get_user_likes().indexOf(poll.poll_question)}</h1> */}


                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <GetTrends />
            </div>
        </div>
    )
}

export default SinglePoll
