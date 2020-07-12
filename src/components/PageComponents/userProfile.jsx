import React, { useEffect } from 'react'
import ProfileHeader from "./profileHeader"
import GetTrends from "./getTrends"
import { useSelector, useDispatch } from "react-redux"
import { get_single_poll, post_currentuser_vote } from "../../store/actions/poll_action"
import { post_followUser, post_unfollowUser } from "../../store/actions/userAuthentication"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { useHistory } from "react-router";
import profileImage from "../../assets/images/no-profile-image.jpg";


export default function UserProfile() {
    const params = useSelector((state) => ({
        single_user: state.userAuth.view_user,
        viewed_user: state.userAuth.user
    }));

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        // used to load profile of the clicked user once the page loads
    }, [params.single_user])

    const get_single_page = (id) => {
        dispatch(get_single_poll(id))
        history.push({
            pathname: `/${id}`
        })
    }

    // used to dispatch an action that sends a post request to follow a user
    const follow_user = (follower_id, following_id) => {
        /*
        follower_id : id of the current logged in user
        following_id : id of the current user whose profile is being viewed
        */
        console.log(follower_id, following_id)
        dispatch(post_followUser({ follower_id, following_id }))
    }

    // for unfollowing a user
    const unfollow_user = (id, user_id, clicked_user_id) => {
        /*
            id : id returned when a successful follow request was made.
            user_id: id of the current logged in user
            clicked_user_id: id of the current user whose profile is being viewed
        */
        console.log(clicked_user_id, "clicked user id from component")
        dispatch(post_unfollowUser({ id, user_id, clicked_user_id }))
    }

    // used to dispatch an action that allows an authenticated user to vote on a particular choice
    const cast_vote = (poll_id, choice_id) => {
        dispatch(post_currentuser_vote({ poll_id, choice_id }))
    }


    const get_user_followers = () => {
        const followed_user = []
        const unfollowed_user = []
        // const currentUser_loggedin_user = params.viewed_user.user.username
        const profile_of_clicked_user = params.single_user.user.username
        params.viewed_user.followed.map(follower => {
            if (follower.following_username === profile_of_clicked_user) {
                followed_user.push(follower.id, follower.following_username)
            } else {
                unfollowed_user.push(follower.following_username, follower.id)
            }
        })
        return followed_user
    }




    return (
        <div className="row">
            <div className="col-md-3">
                <ProfileHeader />
            </div>
            <div className="col-md-6">
                <div>
                    {get_user_followers()[1] === params.single_user.user.username ?
                        // params.viewed_user.user.username === params.single_user.user.username ? "" :
                        <button className="form-control mb-4"
                            style={defaultColor.background_color}
                            onClick={() => unfollow_user(get_user_followers()[0], params.viewed_user.user.id, params.single_user.user.id)}>Following
                        </button>
                        :
                        <button className="form-control mb-4"
                            style={defaultColor.background_color}
                            onClick={() => follow_user(params.viewed_user.user.id, params.single_user.user.id)}>
                            Follow
                            </button>

                    }
                </div>
                <ul className="nav nav-tabs profile-tab" role="tablist">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                        >User Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#polls" role="tab"
                        >Polls
                        <span className="mx-1">
                                {params.single_user.polls.length}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#followers"
                            role="tab"
                        >Followers
                        <span className="mx-1">{params.single_user.followers.map(follower => (follower.total_followers_no))}</span> </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#following"
                            role="tab"
                        >Following
                        <span className="mx-1">{params.single_user.followed.map(followed => (followed.total_followed_no))}</span>
                        </a>

                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#likes"
                            role="tab"
                        >Likes
                         <span className="mx-1">
                                {params.single_user.likes.length}</span></a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="profile" role="tabpanel">
                        <div className="col-md-12 col sm-12 mt-3">
                            <div >
                                <div className="row my-3">
                                    <div className="col-md-4">Profile Image</div>
                                    <div className="col-md-4">
                                        {params.single_user.user.image !== null ?
                                            <img src={params.single_user.user.image} alt="profile image" className="w-100 img-responsive" /> :
                                            <img src={profileImage} alt="" />
                                        }
                                    </div>
                                </div>
                                <h6>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Username
                                                    </div>
                                        <div className="col font-weight-bold">
                                            {params.single_user.user.username}
                                        </div>
                                    </div>


                                </h6>
                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Full Name
                                                    </div>
                                        <div className="col font-weight-bold">
                                            {params.single_user.user.first_name} {params.single_user.user.last_name}
                                        </div>
                                    </div>
                                </h6>

                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Email
                                                </div>
                                        <div className="col font-weight-bold">
                                            {params.single_user.user.email}
                                        </div>
                                    </div>
                                </h6>
                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Position
                                                </div>
                                        <div className="col font-weight-bold">
                                            {params.single_user.user.position}
                                        </div>
                                    </div>
                                </h6>
                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            About Me
                                                </div>
                                        <div className="col font-weight-bold">
                                            {params.single_user.user.bio}
                                        </div>
                                    </div>
                                </h6>

                            </div>
                        </div>
                    </div>

                    <div className="tab-pane" id="polls" role="tabpanel">
                        <div className="mt-5">
                            {
                                params.single_user.polls.map(poll => (
                                    <div key={poll.id} >
                                        <div className="mb-3 card" style={{ borderColor: "lightblue" }} >
                                            <div className="card-body poll" style={{ borderLeft: "1px solid #F0F0F0", position: "relative" }}>
                                                <div>
                                                    <span className="font-weight-bold">
                                                        {params.single_user.user.user_fullname} @ {params.single_user.user.username}
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
                                            </div>
                                        </div><hr />
                                    </div>
                                ))

                            }
                        </div>

                    </div>
                    <div className="tab-pane" id="followers" role="tabpanel">
                        {params.single_user.followers.map(follower => {
                            return (
                                <div key={follower.id} className="mt-2">
                                    {follower.follower_user_fullname ?
                                        <div class="card text-left">
                                            <img class="card-img-top" src="holder.js/100px180/" alt="" />
                                            <div class="card-body">
                                                <h6 class="card-title">{follower.follower_user_fullname} @{follower.follower_username}</h6>
                                                <p class="card-text">{follower.follower_user_bio}</p>
                                            </div>
                                        </div> : " "
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="tab-pane" id="following" role="tabpanel">
                        {params.single_user.followed.map(followed => {
                            return (
                                <div key={followed.id} className="mt-2">
                                    {followed.following_user_fullname ?
                                        <div class="card text-left">
                                            <img class="card-img-top" src="holder.js/100px180/" alt="" />
                                            <div class="card-body">
                                                <h6 class="card-title">{followed.following_user_fullname} @{followed.following_username}</h6>
                                                <p class="card-text">{followed.following_user_bio}</p>
                                            </div>
                                        </div> : ""
                                    }

                                </div>
                            )
                        })}
                    </div>
                    <div className="tab-pane" id="likes" role="tabpanel">
                        {params.single_user.likes.map(like => {
                            return (
                                <div key={like.id} className="mt-2">
                                    {like.question ?
                                        <div class="card text-left">
                                            <img class="card-img-top" src="holder.js/100px180/" alt="" />
                                            <div class="card-body">
                                                <h6 class="card-title">{like.poll_creator_firstname} {like.poll_creator_lastname} @{like.poll_creator_username}</h6>
                                                <p class="card-text">{like.question}</p>
                                            </div>
                                        </div> : ""
                                    }

                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div className="col-md-3">
                <GetTrends />
            </div>


        </div>
    )
}
