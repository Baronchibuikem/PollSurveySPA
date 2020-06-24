import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import ProfileHeader from "./profileHeader"
import GetTrends from "./getTrends"

const SinglePoll = () => {

    const params = useSelector((state) => ({
        single_poll: state.polls.single_poll,
        user: state.userAuth.user
    }));

    // used to dispatch an action that gets all polls from the database
    useEffect(() => {
        console.log("single updated")
    }, [params.single_poll])

    return (
        <div className="row">
            <div className="col-md-3">
                <ProfileHeader />
            </div>
            <div className="col-md-6">
                <div className="card" style={{ borderColor: "darkblue" }}>
                    <img className="card-img-top" src="holder.js/100x180/" alt="" />
                    <div className="card-body">
                        <h4 className="card-title">{params.single_poll.poll_creator_fullname} @{params.single_poll.poll_creator}</h4>
                        <p className="card-text">{params.single_poll.poll_question}</p>
                        {params.single_poll.poll_has_expired ? <span className="text-danger">This poll has expired</span> :
                            <div>
                                {params.single_poll.choices.map((choice) => {
                                    return params.user.username === params.single_poll.poll_creator ?

                                        <button key={choice.id} disabled="disabled" className="form-control bg-secondary my-2" data-toggle="tooltip" data-placement="top" title="Can't vote on your own poll">
                                            {choice.choice_name} {choice.choice_vote_count}
                                        </button>

                                        :
                                        <button className="form-control my-2" style={defaultColor.background_color} key={choice.id}>
                                            {choice.choice_name}
                                        </button>
                                })}
                            </div>
                        }
                        <small className="text-danger">You can't vote on your own poll</small>
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
