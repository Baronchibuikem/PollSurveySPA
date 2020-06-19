import React from 'react'
import { useSelector } from "react-redux"
import { defaultColor } from "../UtilityComponents/HelperFunctions";

const SinglePoll = () => {

    const params = useSelector((state) => ({
        single_poll: state.polls.single_poll,
    }));

    return (
        <div>
            <div className="">
                <div className="card" style={{ borderColor: "darkblue" }}>
                    <img className="card-img-top" src="holder.js/100x180/" alt="" />
                    <div className="card-body">
                        <h4 className="card-title">{params.single_poll.poll_creator_fullname} @{params.single_poll.poll_creator}</h4>
                        <p className="card-text">{params.single_poll.poll_question}</p>
                        <p>
                            {params.single_poll.choices.map((choice) => {
                                return <button className="form-control my-2" style={defaultColor.background_color}>
                                    {choice.choice_name}
                                </button>
                            })}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SinglePoll
