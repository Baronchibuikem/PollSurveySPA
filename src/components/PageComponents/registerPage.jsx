import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux"
import "../StyleComponents/Homepage.css";
import { register_action } from "../../store/actions/userAuthentication"


const RegistrationForm = () => {
	const { register, handleSubmit, errors, watch } = useForm();

	// Here we are instantiating our dispatch action
	const dispatch_register = useDispatch()

	// Here we fetching data from our global state store in redux
	// email_exist_error and username_exist_error are errors coming from the server side if the email and username entered already exist
	const params = useSelector((state) => ({
		loading: state.userAuth.isLoading,
		email_exist_error : state.userAuth.email_exist_error,
		username_exist_error: state.userAuth.username_exist_error
	}));

	// This is used to dispatch a redux action with the needed registration data
	const regSubmit = (data) => {
		dispatch_register(register_action({
			data
		}))
	};

	return (
		<div className="my-2">
			<form
				className="text-center border border-light p-4 col-md-6 col-sm-12 mx-auto shadow login_background_image"
				style={{ backgroundColor: "#eee" }}
				onSubmit={handleSubmit(regSubmit)}>
				<p className="h4 mb-4">Sign up</p>

				<h6 className="text-left font-italic text-light">{params.email_exist_error ? params.email_exist_error : ""}</h6>
				<h6 className="text-left font-italic text-light">{params.username_exist_error ? params.username_exist_error : ""}</h6>
				<div className="mb-4">
					<h6 className="text-left font-italic text-light">{errors.firstname && errors.firstname.type === "required" && (
						<p>Firstname field is required</p>
					)}</h6>
					<input
						type="text"
						name="firstname"
						className="form-control"
						placeholder="Firstname"
						ref={register({ required: true })}
					/>
				</div>

				<div className="mb-4">
					<h6 className="text-left font-italic text-light">{errors.lastname && errors.lastname.type === "required" && (
						<p>Lastname field is required</p>
					)}</h6>
					<input
						type="text"
						name="lastname"
						className="form-control"
						placeholder="lastname"
						ref={register({ required: true })}
					/>
				</div>

				<div className="mb-4">
					<h6 className="text-left font-italic text-light">{errors.username && errors.username.type === "required" && (
						<p>Username field is required</p>
					)}</h6>
					<input
						type="text"
						name="username"
						className="form-control"
						placeholder="Username"
						// value={username}
						ref={register({ required: true })}
					/>
				</div>
				<div className="mb-4">
					<h6 className="text-left font-italic text-light">{errors.email && errors.email.type === "required" && (
						<p>Email field is required</p>
					)}</h6>
					<input
						type="email"
						name="email"
						className="form-control mb-4"
						placeholder="Email"
						ref={register({ required: true })}
					/>
				</div>
				<div className="mb-4">
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
				</div>
				<h6 className="text-left font-italic text-light">{errors.password2 && errors.password2.type === "required" && (
					<p>Confirm Password field is required</p>
				)}</h6>
				<h6 className="text-left font-italic text-light">{errors.password2 && errors.password2.type === "validate" && (
					<p>Passwords don't match</p>
				)}</h6>
				<input
					type="password"
					name="password2"
					className="form-control"
					placeholder="Confirm Password"
					ref={register({ required: true, validate: (value) => {
						return value === watch("password")
					} })}
				/>
				<button className="btn btn-info my-4 btn-block" type="submit">
					{params.loading}
				</button>
				<p className="text-light">
					<Link to="login" className="lg mx-1 font-weight-bold">
						Login
					</Link>
					if you have an account
				</p>

				<hr />

				<p className="text-light">
					By clicking
					<em>Sign up</em> you agree to our
					<Link to="" target="_blank" className="mx-1">
						Terms and Conditions
					</Link>
				</p>
			</form>
			<hr />
		</div>
	);
};

export default RegistrationForm;
