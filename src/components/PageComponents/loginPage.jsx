import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
// import PropTypes from "prop-types";
import { login } from "../../store/actions/userAuthentication";
import "../StyleComponents/Homepage.css";

const LoginForm = () => {
	// Here we are declaring our initial state and a function to be called when it needs to be updated
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Here we are instantiating our dispatch action
	const dispatch_login = useDispatch();

	// Here we fetching data from our global state store in redux
	const params = useSelector((state) => ({
		authenticated: state.userAuth.isAuthenticated,
		error: state.userAuth.error,
	}));

	useEffect(() => {
	}, [params.login_error])

	// hooks form 
	const { register, handleSubmit, errors } = useForm();

	// this is used to dispatch a redux action with the neeeded login data
	const onSubmit = (data) => {
		dispatch_login(login({ email: data.email, password: data.password }));
	};

	// Here we use this function to update our email value when it changes
	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	// Here we use this function to update our password value when ut changes
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	// Here we are checking if our authenticated value from the state is true, it yes we redirect to the homepage
	if (params.authenticated === true) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login_background_image">
			<div className="row center-content container mx-auto">
				<div className="col-md-6 col-sm-12">
					<ul style={{ fontSize: "35px", color: "white" }} className="list-unstyled content-size">
						<li> <i className="fa fa-check" aria-hidden="true"></i> Create poll</li>
						<li>  <i className="fa fa-check" aria-hidden="true"></i> Vote on a poll choice</li>
						<li>  <i className="fa fa-check" aria-hidden="true"></i> Bookmark a poll</li>
						<li>  <i className="fa fa-check" aria-hidden="true"></i> Follow your favourite pollers</li>
						<li>  <i className="fa fa-check" aria-hidden="true"></i> View total votes</li>
						<li>  <i className="fa fa-check" aria-hidden="true"></i> Like a poll</li>
					</ul>
				</div>
				<div className="col-md-6 col-sm-12">
					<form
						className="text-center border border-light px-5 py-3 mx-auto shadow form_background_image"
						style={{ backgroundColor: "#eee" }}
						onSubmit={handleSubmit(onSubmit)}>
						<h5 className="text-danger bold">{params.error !== null ? params.error : ""}</h5>
						<p className="h4 mb-4 text-light font-weight-bold">	<span style={{ fontSize: "40px" }}>L</span>ogin</p>

						<div className="mb-4">
							<span className="text-light font-weight-bold">{params.email_error}</span>
							<h6 className="text-left font-italic text-light">{errors.email && errors.email.type === "required" && (
								<p>Email field is required</p>
							)}</h6>
							<input
								type="email"
								name="email"
								className="form-control"
								placeholder="Email"
								ref={register({ required: true })}
							/>
						</div>
						<h6 className="text-left font-italic text-light">{errors.password && errors.password.type === "required" && (
							<p>Password field is required</p>
						)}</h6>
						<input
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
							ref={register({ required: true })}
						/>
						<button className="btn btn-info my-4 btn-block" type="submit">
							{params.status ?
								<div>
									{
										params.error && !params.status ? "Try again" :
											// <div className="spinner-border" role="status">
											// "Send"
											// </div>
											params.loading
									}
								</div> :
								"Login"}
						</button>
						<hr />
						<p className="text-light">
							Don't have an <em> account </em>
							<Link to="/register" className="lg mx-1">Register</Link>
						</p>
					</form>
					<hr />
				</div>
			</div>
		</div >
	);
};

export default LoginForm;
