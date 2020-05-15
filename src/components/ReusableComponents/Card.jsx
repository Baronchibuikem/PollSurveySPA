import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Card = props => {
	return (
		<div class="card text-left shadow" style={{ height: "300px" }}>
			<div className="container mt-4">
				<div className="row px-3">
					<div className="col-md-3">
						<img src={props.icon} alt="icon" />
					</div>
					<div className="col-md-9 pt-2 font-weight-bold">{props.title}</div>
				</div>
				<div className="card-body mt-4">
					<p className="card-text">{props.children}</p>
				</div>
				<div className="mt-2 mb-4">
					<Link exact to={props.link}>
						<Button width="50%" color="#413A76" textcolor="white">
							{props.buttonTitle}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
