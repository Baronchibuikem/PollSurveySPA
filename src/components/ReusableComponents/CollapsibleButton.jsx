import React from "react";

const Collapsible = props => {
	const { id } = props;
	console.log(id);

	const ident = "#collapse" + id;
	const ident2 = "headingOne" + id;
	console.log(ident);
	const second_id = "collapse" + id;
	return (
		<div className="container mt-5 pt-5">
			<div id="accordion">
				<div className="card">
					<div
						className="card-header"
						id={ident2}
						data-toggle="collapse"
						data-target={ident}
						aria-expanded="true"
						aria-controls={second_id}
						style={{ backgroundColor: "#413a76" }}>
						<h5 className="mb-0 text-light">{props.title}</h5>
					</div>

					<div
						id={ident}
						className="collapse show"
						aria-labelledby={ident2}
						data-parent="#accordion">
						<div className="card-body">{props.children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Collapsible;
