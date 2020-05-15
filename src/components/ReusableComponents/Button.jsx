import React, { Fragment } from "react";

// This page is a customized page used to return a button component

const Button = props => {
	return (
		<Fragment>
			<button
				style={{
					backgroundColor: props.color,
					width: props.width,
					color: props.textcolor
				}}
				className="form-control">
				{props.children}
			</button>
		</Fragment>
	);
};

export default Button;
