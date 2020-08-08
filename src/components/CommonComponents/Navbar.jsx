import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { logout } from "../../store/actions/userAuthentication"
import { useHistory } from "react-router";
import { viewClickedUserById } from "../../store/actions/userAuthentication"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { Grid } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));



export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	// hooks
	const history = useHistory()
	const dispatch = useDispatch()

	const get_user = (id) => {
		dispatch(viewClickedUserById(id))
		history.push({
			pathname: `/user/${id}`
		})
	}

	// used to fetch the value of state from the reducer
	const params = useSelector((state) => ({
		authenticated: state.userAuth.isAuthenticated,
		current_user: state.userAuth.user
	}));

	const clickLogout = (e) => {
		// used to dispatch an action that logs a user out
		dispatch(logout());
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};


	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon style={{ color: "white" }} />
					</IconButton>
					<Typography variant="h6" noWrap className="text-white">
						PollSurvey
          			</Typography>
					{/* <Typography variant="h6" noWrap className="text-right text-white">
						{params.authenticated ? params.current_user.user.username :
							""}
					</Typography> */}
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{params.authenticated ?
						<div>
							<ListItem button>
								<ListItemIcon><InboxIcon style={{ color: "white" }} /></ListItemIcon><ListItemText onClick={() => { get_user(params.current_user.user.id) }}>Profile</ListItemText>
							</ListItem>
							<ListItem button>
								<ListItemIcon><InboxIcon style={{ color: "white" }} /></ListItemIcon><ListItemText>My poll</ListItemText>
							</ListItem>
							<ListItem button>
								<ListItemIcon><InboxIcon style={{ color: "white" }} /></ListItemIcon><ListItemText onClick={clickLogout}>Logout</ListItemText>
							</ListItem>
						</div> :
						<div>
							<Link to="/register" className="text-light pollhover">
								<ListItem button>
									<ListItemIcon><InboxIcon style={{ color: "white" }} /></ListItemIcon><ListItemText>Register</ListItemText>
								</ListItem>
							</Link>
							<Link to="/login" className="text-light pollhover">
								<ListItem button>
									<ListItemIcon><InboxIcon style={{ color: "white" }} /></ListItemIcon><ListItemText>Login</ListItemText> :
								</ListItem>
							</Link>
						</div>
					}
				</List>

				<Divider />
				{/* <List>
					{['All mail', 'Trash', 'Logout'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List> */}
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />

			</main>
		</div>
	);
}
