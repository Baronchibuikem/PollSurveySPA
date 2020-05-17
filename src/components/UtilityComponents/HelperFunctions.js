// This is used to add default site background color
export const defaultColor = {
	background_color: {
		backgroundColor: "#413a76",
		color: "white",
	},
	profile_header: {
		backgroundColor: "#413a76",
		color: "white",
		height: "400px",
	},
};

// This is our console.log() function
export const Logger = ({ ...param }) => {
	return console.log({ ...param });
};
