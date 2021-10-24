import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const channelDetail = useSelector((state) => state.channelDetailMy);
	const { channel } = channelDetail;

	const dispatch = useDispatch();
	const history = useHistory();

	const logoutHandler = () => {
		dispatch(logout());
		history.push("/login");
	};

	return (
		<header>
			<Navbar bg='white' expand='md' collapseOnSelect>
				<Container>
					<IndexLinkContainer exact to='/'>
						<Navbar.Brand className='d-flex flex-md-grow-1'>STREAMZ</Navbar.Brand>
					</IndexLinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='text-center'>
							{!userInfo ? (
								<IndexLinkContainer exact to='/'>
									<Nav.Link>Home</Nav.Link>
								</IndexLinkContainer>
							) : (
								<IndexLinkContainer to='/dashboard'>
									<Nav.Link>Dashboard</Nav.Link>
								</IndexLinkContainer>
							)}
							{userInfo && (!channel || !channel.name) && (
								<LinkContainer to='/createChannel'>
									<Nav.Link>Channel</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && channel && channel.name && (
								<LinkContainer to='/livestream'>
									<Nav.Link>Livestream</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && (
								<>
									<NavDropdown title={`${userInfo.email.split("@")[0]}`}>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>
										{channel && channel.name && (
											<LinkContainer to='/channel'>
												<NavDropdown.Item>MyChannel</NavDropdown.Item>
											</LinkContainer>
										)}
										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							)}
							{!userInfo && (
								<>
									<IndexLinkContainer exact to='/login'>
										<Nav.Link>Login</Nav.Link>
									</IndexLinkContainer>
									<LinkContainer to='/register'>
										<Nav.Link>Register</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
