import React from 'react'
import { useSelector } from "react-redux"


export default function UserProfile() {
    const params = useSelector((state) => ({
        single_user: state.userAuth.user,
    }));

    return (
        <div>
            <h1>User Profile</h1>
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
										<div v-if="show === true">
											<h6>
												<b>Username</b>
												@{ params.single_user.username }
											</h6>
											<h6 className="mt-4">
												<b>First Name</b>
												@{ params.single_user.first_name }
											</h6>
											<h6 className="mt-4">
												<b>Last Name</b>
												@{ params.single_user.last_name }
											</h6>
											<h6 className="mt-4">
												<b>Email</b>
												@{ params.single_user.email }
											</h6>
											<h6 className="mt-4">
												<b>Position</b>
												@{ params.single_user.position }
											</h6>
											<h6 className="mt-4">
											<b>About</b>
											@{ params.single_user.bio }
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
