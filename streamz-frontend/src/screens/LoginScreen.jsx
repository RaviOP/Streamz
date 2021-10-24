import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { getMyChannelDetails } from "../actions/channelActions";

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;

	useEffect(() => {
		if (userInfo) {
			dispatch(getMyChannelDetails());
			history.push(redirect);
		}
	}, [history, userInfo, redirect, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email.toLowerCase(), password));
		setPassword("");
	};

	return (
		<div className='profile-body'>
			<FormContainer>
				<div className='profile-form'>
					<span className='heading'>Login</span>
					{error && <Message children={error} variant='danger' />}
					{loading && <Loader />}
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter your Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter your Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							></Form.Control>
						</Form.Group>
						<div className='text-center mt-3'>
							<button type='submit' className='order-button'>
								Login
							</button>
						</div>
					</Form>
					<Row className='py-3'>
						<Col className='text-center'>
							<Link className='link' to='/register'>
								Don't Have an Account?
							</Link>
						</Col>
					</Row>
				</div>
			</FormContainer>
		</div>
	);
};

export default LoginScreen;
