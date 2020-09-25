// import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { logout } from "../../store/actions/userAuthentication";
import { useHistory } from "react-router";
import { viewClickedUserById } from "../../store/actions/userAuthentication";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // hooks
  const history = useHistory();
  const dispatch = useDispatch();

  const get_user = (id) => {
    dispatch(viewClickedUserById(id));
    history.push({
      pathname: `/user/${id}`,
    });
  };

  // used to fetch the value of state from the reducer
  const params = useSelector((state) => ({
    authenticated: state.userAuth.isAuthenticated,
    current_user: state.userAuth.user,
  }));

  const clickLogout = (e) => {
    // used to dispatch an action that logs a user out
    dispatch(logout());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {params.authenticated ? (
        <div className="mt-5">
          <Link to="/" className="text-light pollhover">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              onClick={() => {
                get_user(params.current_user.user.id);
              }}
            >
              Profile
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText>My poll</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText onClick={clickLogout}>Logout</ListItemText>
          </ListItem>
        </div>
      ) : (
        <div className="mt-5">
          <Link to="/register" className="text-light pollhover">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </ListItem>
          </Link>
          <Link to="/login" className="text-light pollhover">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(anchor, true)}
              edge="start"
              className="ml-1"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
        <Typography variant="h6" className="mr-auto">
          <Link to="/" className="text-light ml-3">
            Welcome to Poll Survey
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
