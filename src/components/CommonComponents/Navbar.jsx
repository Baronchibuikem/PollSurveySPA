import React, { useState } from "react";
import { Menu, Dropdown, Button, message, Tooltip, Drawer, Radio, Space, Divider, Layout, Row, Col } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { defaultColor } from "../UtilityComponents/HelperFunctions";
import { logout } from "../../store/actions/userAuthentication"
import { useHistory } from "react-router";
import { viewClickedUserById } from "../../store/actions/userAuthentication"

const NavbarPage = () => {

	const [visible, setVisible] = useState(false)
	const [placement, setPlacement] = useState("left")

	const { Header, Content, Footer } = Layout;

	const showDrawer = () => {
		setVisible(true)
	};

	// hooks
	const history = useHistory()
	const dispatch = useDispatch()

	const get_user = (id) => {
		dispatch(viewClickedUserById(id))
		history.push({
			pathname: `/user/${id}`
		})
	}

	const onClose = () => {
		setVisible(false)
	};

	const onChange = e => {
		setPlacement(e.target.value)
	};


	// used to fetch the value of state from the reducer
	const params = useSelector((state) => ({
		authenticated: state.userAuth.isAuthenticated,
		current_user: state.userAuth.user
	}));

	const onSubmit = (e) => {
		// used to dispatch an action that logs a user out
		dispatch(logout());
	};


	const menu_authenticated = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<UserOutlined />} onClick={() => { get_user(params.current_user.user.id) }}>
				My Profile
		  </Menu.Item>
			<Menu.Item key="2" icon={<UserOutlined />}>
				My Polls
		  </Menu.Item>
			<Menu.Item key="3" icon={<UserOutlined />} onClick={onSubmit}>
				Logout
		  </Menu.Item>
		</Menu>
	);

	const menu_unauthenticated = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<UserOutlined />}>
				<Link to="/login" className="lg mx-1">Login</Link>
			</Menu.Item>
			<Menu.Item key="2" icon={<UserOutlined />}>
				<Link to="/register" className="lg mx-1">Register</Link>
			</Menu.Item>
		</Menu>
	)

	function handleMenuClick(e) {
		message.info('Click on menu item.');
		console.log('click', e);
	}
	return (
		<Layout className="layout" style={defaultColor.background_color}>
			{/* <Header> */}
			<div className="container">
				<Menu mode="horizontal" defaultSelectedKeys={['2']} style={defaultColor.background_color}>
					<Row>
						<Col span={12}>
							<Radio.Group defaultValue={placement} onChange={onChange}>
								{/* <Radio value="top">top</Radio> */}
								<Radio value="right">right</Radio>
								{/* <Radio value="bottom">bottom</Radio> */}
								<Radio value="left">left</Radio>
							</Radio.Group>
							<Button type="primary" onClick={showDrawer}>
								Open
          					</Button>
						</Col>
						<Col span={12} className="text-right d-none d-md-block">
							{params.authenticated === true ?
								<Dropdown overlay={menu_authenticated}>
									<Button>
										{params.authenticated ? params.current_user.user.username :
											""} <DownOutlined />
									</Button>
								</Dropdown> :
								<Dropdown overlay={menu_unauthenticated}>
									<Button>
										Click me<DownOutlined />
									</Button>
								</Dropdown>}
						</Col>
					</Row>
				</Menu>

				<Drawer
					title="PollSurvey"
					placement={placement}
					closable={false}
					onClose={onClose}
					visible={visible}
					key={placement}
				>
					<div className="text-white">
						{params.authenticated ?
							<div>
								<p onClick={() => { get_user(params.current_user.user.id) }}>My Profile</p>
								<Divider style={{ color: "white" }}></Divider>
								<p>My Polls</p>
								<Divider style={{ color: "white" }}></Divider>
								<p onClick={onSubmit}>Logout</p>
								<Divider style={{ color: "white" }}></Divider>
							</div>
							:
							<div>
								<div className="row">
									<div className="col-md-6"><Link to="/register" className="text-light">Register</Link></div>
									<div className="col-md-6"><Link to="/login" className="text-light mx-1">Login</Link></div>
									<Divider style={{ backgroundColor: "white" }}></Divider>
								</div>
								<ul style={{ color: "white" }} className="list-unstyled">
									<li> <i class="fa fa-check" aria-hidden="true"></i> Create poll</li>
									<Divider style={{ color: "white" }}></Divider>
									<li>  <i className="fa fa-check" aria-hidden="true"></i> Vote on a poll choice</li>
									<Divider style={{ color: "white" }}></Divider>
									<li>  <i className="fa fa-check" aria-hidden="true"></i> Bookmark a poll</li>
									<Divider style={{ color: "white" }}></Divider>
									<li>  <i className="fa fa-check" aria-hidden="true"></i> Follow your favourite pollers</li>
									<Divider style={{ color: "white" }}></Divider>
									<li>  <i className="fa fa-check" aria-hidden="true"></i> View total votes</li>
									<Divider style={{ color: "white" }}></Divider>
									<li>  <i className="fa fa-check" aria-hidden="true"></i> Like a poll</li>
									<Divider style={{ color: "white" }}></Divider>

								</ul>

							</div>
						}
					</div>
				</Drawer>
			</div >
			{/* </Header> */}
		</Layout >
	);
}

export default NavbarPage;