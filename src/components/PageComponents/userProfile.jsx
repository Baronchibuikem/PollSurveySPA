import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import ProfileHeader from "./profileHeader"
import GetTrends from "./getTrends"
import { useSelector, useDispatch } from "react-redux"
import { get_single_poll, post_currentuser_vote } from "../../store/actions/poll_action"
import { post_followUser, post_unfollowUser, post_edit_userprofile, viewClickedUserById } from "../../store/actions/userAuthentication"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { useHistory } from "react-router";
import profileImage from "../../assets/images/no-profile-image.jpg";
import "../StyleComponents/AllPolls.css"
// import Modal from "./modal"


export default function UserProfile() {

    // For managing state in this component
    const [image_file, setImage] = useState(null)

    // hooks form, because we are using multiple forms, it was neccessary to instantiate different hook instances
    const { register, handleSubmit } = useForm();
    const { register: register_email, handleSubmit: handleSubmit_email } = useForm()
    const { register: register_bio, handleSubmit: handleSubmit_bio } = useForm()
    const { register: register_image, handleSubmit: handleSubmit_image } = useForm()

    // Getting data from redux state
    const params = useSelector((state) => ({
        // data for user whose profile is being viewed
        single_user: state.userAuth.view_user,
        // data for current logged in user
        viewed_user: state.userAuth.user,
        // For checking the loading state of the data being sent to the server
        loading: state.userAuth.isLoading,
        // For checking the status of a request
        status: state.userAuth.status
    }));

    // used to create a dispatch action
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

    // for submitting username edit method
    const post_edit_username = (data) => {
        // console.log(data)
        dispatch(post_edit_userprofile({ username: data.username, user_id: params.viewed_user.user.id }))
    }

    // for submitting email edit method
    const post_edit_email = (data) => {
        dispatch(post_edit_userprofile({ email: data.email, user_id: params.viewed_user.user.id }))
    }

    // for submitting user password change method
    // const post_edit_password = (data) => {
    //     console.log(data)
    // }

    // for submitting bio edit method
    const post_edit_bio = (data) => {
        dispatch(post_edit_userprofile({ bio: data.bio, user_id: params.viewed_user.user.id }))
    }

    // for submitting image edit method
    const post_edit_image = (e, data) => {
        e.preventDefault()
        let form = new FormData()
        let image = image_file
        form.append("image", image)
        console.log(form, "form from image")
        dispatch(post_edit_userprofile({ image: form, user_id: params.viewed_user.user.id }))
    }

    // used to dipatch an action that that gets the profile of the clicked user and
    // then change the route to user profile page
    const get_user = (id) => {
        dispatch(viewClickedUserById(id))
        history.push({
            pathname: `/user/${id}`
        })
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


    // for getting the selected image/file when user wants to update his image profile
    const selectFile = (event) => {
        console.log(event.target.files[0], "from image ")
        setImage(event.target.files[0]);
    };

    return (
        <div className="row">
            <div className="col-md-3">
                <ProfileHeader />
            </div>
            <div className="col-md-6">
                {params.single_user.user.username === params.viewed_user.user.username ? "" :
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
                }
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
                                            <img src={params.single_user.user.image} alt="profile_image" className="w-100 img-responsive" /> :
                                            <img src={profileImage} alt="" data-toggle="tooltip" data-placement="top" title="Edit" />

                                        }

                                        {params.single_user.user.username === params.viewed_user.user.username ?

                                            <i className="fa fa-pen ml-1 pollhover" data-toggle="modal" data-target="#modelId6"
                                                data-placement="top" title="Edit" style={{ color: "blue" }}
                                            ></i> : ""}

                                        <form>
                                            <div className="modal fade" id="modelId6" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Update your Image</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="container-fluid">
                                                                <input
                                                                    type="file"
                                                                    name="image"
                                                                    className="form-control"
                                                                    accept="image/*"
                                                                    onChange={selectFile}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            {params.status ? "updated successfully" : ""}
                                                            <button type="button" className="btn btn-primary" onClick={post_edit_image}>Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>



                                    </div>
                                </div>
                                <h6>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Username
                                                    </div>
                                        <div className="col font-weight-bold d-flex">
                                            {params.single_user.user.username}

                                            {params.single_user.user.username === params.viewed_user.user.username ?

                                                <i className="fa fa-pen ml-1 pollhover" data-toggle="modal" data-target="#modelId"
                                                    data-placement="top" title="Edit" style={{ color: "blue" }}
                                                ></i> : ""}

                                            <form onSubmit={handleSubmit(post_edit_username)}>
                                                <div className="modal fade" id="modelId" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Edit your username</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container-fluid">
                                                                    <input type="text"
                                                                        name="username"
                                                                        className="form-control"
                                                                        placeholder={params.single_user.user.username}
                                                                        ref={register({ required: true })} />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                {params.status ? "updated successfully" : ""}
                                                                <button type="submit" class="btn btn-primary"
                                                                    onClick={handleSubmit(post_edit_username)}>Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>



                                        </div>

                                    </div>


                                </h6>
                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Full Name
                                                    </div>
                                        <div className="col font-weight-bold d-flex">
                                            {params.single_user.user.first_name} {params.single_user.user.last_name}
                                            {/* <i className="fa fa-pen ml-1 pollhover" data-toggle="modal" data-target="#modelId2"
                                                data-placement="top" title="Edit" style={{ color: "blue" }}
                                            ></i>

                                            <div class="modal fade" id="modelId2" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title">Modal title</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="container-fluid">
                                                                Add rows here
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}


                                        </div>
                                    </div>
                                </h6>

                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Email
                                                </div>
                                        <div className="col font-weight-bold d-flex">
                                            {params.single_user.user.email}
                                            {/* <Modal title="Edit Email" id="3" /> */}
                                            {params.single_user.user.username === params.viewed_user.user.username ?

                                                <i className="fa fa-pen ml-1 pollhover" data-toggle="modal" data-target="#modelId3"
                                                    data-placement="top" title="Edit" style={{ color: "blue" }}
                                                ></i> : ""}

                                            <form onSubmit={handleSubmit_email(post_edit_email)}>
                                                <div className="modal fade" id="modelId3" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Edit your Email Address</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container-fluid">
                                                                    <input type="text"
                                                                        name="email"
                                                                        className="form-control"
                                                                        placeholder={params.single_user.user.email}
                                                                        ref={register_email({ required: true })} />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                {params.status ? "updated successfully" : ""}
                                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                </h6>

                                <h6 className="mt-4">
                                    <div className="row">
                                        <div className="col-md-4">
                                            About Me
                                                </div>
                                        <div className="col font-weight-bold d-flex">
                                            {params.single_user.user.bio}
                                            {/* <Modal title="Edit About Me" id="5" /> */}
                                            {params.single_user.user.username === params.viewed_user.user.username ?
                                                <i className="fa fa-pen ml-1 pollhover" data-toggle="modal" data-target="#modelId5"
                                                    data-placement="top" title="Edit" style={{ color: "blue" }}
                                                ></i> : ""}

                                            <form onSubmit={handleSubmit_bio(post_edit_bio)}>
                                                <div className="modal fade" id="modelId5" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Edit your bio</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container-fluid">
                                                                    <input type="text"
                                                                        name="bio"
                                                                        className="form-control"
                                                                        placeholder="Please enter your your bio here"
                                                                        ref={register_bio({ required: true })} />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                {params.status ? "updated successfully" : ""}
                                                                <button type="submit" className="btn btn-primary">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>


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
                                    <div key={poll.pk} >
                                        <div className="mb-3 card" style={{ borderColor: "lightblue" }} >
                                            <div className="card-body poll" style={{ borderLeft: "1px solid #F0F0F0", position: "relative" }}>
                                                <div>
                                                    <span className="font-weight-bold">
                                                        {params.single_user.user.user_fullname} @ {params.single_user.user.username}
                                                    </span>
                                                </div>
                                                <p className="card-title pollhover" onClick={() => get_single_page(poll.pk)}>{poll.poll_question}</p>

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
                                        <div className="card text-left">
                                            <img className="card-img-top" src="holder.js/100px180/" alt="" />
                                            <div className="card-body">
                                                <h6 className="card-title pollhover"
                                                    onClick={() => get_user(follower.follower_id)}>{follower.follower_user_fullname} @{follower.follower_username}</h6>
                                                <p className="card-text">{follower.follower_user_bio}</p>
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
                                        <div className="card text-left">
                                            <img className="card-img-top" src="holder.js/100px180/" alt="" />
                                            <div className="card-body">
                                                <h6 className="card-title pollhover"
                                                    onClick={() => get_user(followed.following_id)}>{followed.following_user_fullname} @{followed.following_username}</h6>
                                                <p className="card-text">{followed.following_user_bio}</p>
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
                                        <div className="card text-left">
                                            <img className="card-img-top" src="holder.js/100px180/" alt="" />
                                            <div className="card-body">
                                                <h6 className="card-title">{like.poll_creator_firstname} {like.poll_creator_lastname} @{like.poll_creator_username}</h6>
                                                <p className="card-text">{like.question}</p>
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


        </div >
    )
}
