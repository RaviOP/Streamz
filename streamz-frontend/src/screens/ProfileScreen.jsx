import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import {
	deleteUserProfile,
	getUserProfile,
	logout,
	updateUserProfile,
} from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const ProfileScreen = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();

	const userProfile = useSelector((state) => state.userProfile);
	const { loading, user, error } = userProfile;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;
	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user || !user.email || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserProfile());
			} else {
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password Do Not Match");
			setPassword("");
			setConfirmPassword("");
		} else {
			//Dispatch Update Profile
			dispatch(updateUserProfile(password));
		}
	};

	const deleteHandler = (e) => {
		e.preventDefault();
		if (
			window.confirm(
				`Are You Sure. Do You want to Delete your Account? It Will Delete your Channel If It Exist.`
			)
		) {
			dispatch(deleteUserProfile());
			dispatch(logout());
			history.push("/register");
		}
	};

	return (
		<div className='profile-body'>
			<FormContainer>
				<Row>
					<Col className='profile-form'>
						<p className='heading'>Profile</p>
						{message && <Message variant='danger'>{message}</Message>}
						{success && <Message variant='success'>Profie Updated</Message>}
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
									disabled
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='password'>
								<Form.Label>New Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='New Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm New Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm New Password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								></Form.Control>
							</Form.Group>
							<div className='text-center mt-4'>
								<Button type='submit' size='sm' variant='outline-success'>
									Update Account
								</Button>
							</div>
							<div className='text-center mt-4'>
								<Button
									type='button'
									size='sm'
									variant='outline-danger'
									onClick={deleteHandler}
								>
									Delete Account
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</FormContainer>
		</div>
	);
};

export default ProfileScreen;
