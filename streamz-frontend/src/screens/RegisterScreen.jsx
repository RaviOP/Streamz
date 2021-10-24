import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password Do Not Match");
			setPassword("");
			setConfirmPassword("");
		} else {
			dispatch(register(email.toLowerCase(), password));
		}
	};

	return (
		<div className='profile-body'>
			<FormContainer>
				<div className='profile-form'>
					<span className='heading'>REGISTER</span>
					{message && <Message variant='danger'>{message}</Message>}
					{error && <Message variant='danger'>{error}</Message>}
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
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='confirmPassword'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							></Form.Control>
						</Form.Group>
						<div className='text-center mt-3'>
							<button type='submit' className='order-button'>
								Register
							</button>
						</div>
					</Form>
					<Row className='py-3'>
						<Col className='text-center'>
							<Link
								className='link'
								to={redirect ? `/login?redirect=${redirect}` : `/login`}
							>
								Already have an Account?
							</Link>
						</Col>
					</Row>
				</div>
			</FormContainer>
		</div>
	);
};

export default RegisterScreen;
