import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../StyleComponents/Homepage.css";

const RegistrationForm = () => {
	const { username, setUsername } = useState("");
	const { email, setEmail } = useState("");
	const { firstname, setFirstname } = useState("");
	const { lastname, srtLastname } = useState("");
	const { password, setPassword } = useState("");
	const { password2, setPassword2 } = useState("");
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className="my-5 py-5">
			<form
				className="text-center border border-light p-5 col-md-6 col-sm-12 mx-auto shadow login_background_image"
				style={{ backgroundColor: "#eee" }}
				onSubmit={handleSubmit(onSubmit)}>
				<p className="h4 mb-4">Sign up</p>

				<div className="mb-4">
					<input
						type="text"
						name="firstname"
						className="form-control"
						placeholder="firstname"
						//   onChange={this.onChange}
						value={firstname}
						ref={register}
					/>
				</div>

				<div className="mb-4">
					<input
						type="text"
						name="lastname"
						className="form-control"
						placeholder="lastname"
						//   onChange={this.onChange}
						value={lastname}
						ref={register}
					/>
				</div>

				<div className="mb-4">
					<input
						type="text"
						name="username"
						className="form-control"
						placeholder="Username"
						//   onChange={this.onChange}
						value={username}
						ref={register}
					/>
				</div>

				<input
					type="email"
					name="email"
					className="form-control mb-4"
					placeholder="E-mail"
					// onChange={this.onChange}
					value={email}
					ref={register}
				/>

				<input
					type="password"
					name="password"
					className="form-control"
					placeholder="Password"
					// onChange={this.onChange}
					value={password}
					ref={register}
				/>
				<small
					id="defaultRegisterFormPasswordHelpBlock"
					className="form-text text-white mb-4">
					At least 8 characters and 1 digit
				</small>

				<input
					type="password"
					name="password2"
					className="form-control"
					placeholder="Password2"
					// onChange={this.onChange}
					value={password2}
					ref={register}
				/>
				<small
					id="defaultRegisterFormPasswordHelpBlock"
					className="form-text text-white mb-4">
					At least 8 characters and 1 digit
				</small>

				<button className="btn btn-info my-4 btn-block" type="submit">
					Register
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
