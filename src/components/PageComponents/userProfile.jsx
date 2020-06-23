import React, {useEffect} from 'react'
import { useSelector } from "react-redux"


export default function UserProfile() {
    const params = useSelector((state) => ({
        single_user: state.userAuth.viewed_user,
    }));

    useEffect(() => {
		console.log("userprofile loaded")
	}, [params.single_user])

    return (
        <div>
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
                        >Polls</a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#followers"
                        role="tab"
                        >Followers </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#following"
                        role="tab"
                        >Following
                        
                        </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#likes"
                        role="tab"
                        >Likes</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active" id="profile" role="tabpanel">
                <div className="col-md-12 col sm-12 mt-3">
										<div >
											<h6>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                    Username
                                                    </div>
                                                    <div className="col font-weight-bold">
                                                    { params.single_user.username }
                                                    </div>
                                                </div>
											
												
											</h6>
											<h6 className="mt-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                    Full Name
                                                    </div>
                                                    <div className="col font-weight-bold">
                                                    { params.single_user.user_fullname }
                                                    </div>
                                                </div>												
											</h6>
											
											<h6 className="mt-4">
                                            <div className="row">
                                                <div className="col-md-4">
                                                Email
                                                </div>
                                                <div className="col font-weight-bold">
                                                { params.single_user.email }
                                                </div>
                                                </div>												
											</h6>
											<h6 className="mt-4">
                                            <div className="row">
                                            <div className="col-md-4">
                                                Position
                                                </div>
                                                <div className="col font-weight-bold">
                                               { params.single_user.position }
                                                </div>
                                                </div>
											</h6>
											<h6 className="mt-4">
                                            <div className="row">
                                            <div className="col-md-4">
                                                About Me
                                                </div>
                                                <div className="col font-weight-bold">
                                                { params.single_user.bio }
                                                </div>	
                                            </div>
											</h6>
											
										</div>
									</div>
                </div>

                <div className="tab-pane" id="polls" role="tabpanel">
                Polls	
                </div>
                <div className="tab-pane" id="followers" role="tabpanel">
                    Followers
                </div>
                <div className="tab-pane" id="following" role="tabpanel">
                    Following
                </div>
                <div className="tab-pane" id="likes" role="tabpanel">
                    Likes
                </div>
                </div>     </div>
    )
}
