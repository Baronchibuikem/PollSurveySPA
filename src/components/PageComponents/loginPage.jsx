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
		loading: state.userAuth.isLoading,
		email_error: state.userAuth.login_email_error,
		login_error: state.userAuth.login_error,
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
		<div className="my-5 py-5">

			<form
				className="text-center border border-light p-5  col-md-6 col-sm-12 mx-auto shadow login_background_image"
				style={{ backgroundColor: "#eee" }}

				onSubmit={handleSubmit(onSubmit)}>
				<h5 className="text-light">{params.login_error}</h5>
				<p className="h4 mb-4 text-light font-weight-bold">
					<span style={{ fontSize: "40px" }}>L</span>ogin
				</p>

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

				<span className="text-light font-weight-bold">{params.password_error}</span>
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
					{params.loading}
				</button>
				<hr />
				<p className="text-light">
					Don't have an
					<em> account </em>
					<Link to="/register" className="lg mx-1">
						Register
					</Link>
				</p>

			</form>
			<hr />
		</div>
	);
};

export default LoginForm;
