// This is used to add default site background color
export const defaultColor = {
	background_color: {
		backgroundColor: "#413a76",
		color: "white",
	},
	text_color: {
		color: "#413a76"
	},
	profile_header: {
		backgroundColor: "#413a76",
		color: "white",
	},
	disable_button_color: {
		backgroundColor: "grey"
	}
};
export const defaultImage = {
	login_background_image: {
		background: "url'(../../../../assets/images/login-bg.svg)'",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
		backgroundPosition: "center center",
	},
};

// This is our console.log() function
export const Logger = ({ ...param }) => {
	return console.log({ ...param });
};
