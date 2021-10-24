import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../actions/channelActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ChannelScreen = ({ history, location }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const channelDetail = useSelector((state) => state.channelDetailMy);
	const { channel: channelExist } = channelDetail;

	const channelCreate = useSelector((state) => state.channelCreate);
	const { loading, error, channel } = channelCreate;

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		}
		if (channelExist && channelExist.name) {
			history.push(redirect);
		}
		if (channel && channel.name) {
			history.push(redirect);
		}
	}, [dispatch, history, userInfo, channel, channelExist, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createChannel(name, description));
	};
	return (
		<div className='profile-body'>
			<FormContainer>
				<div className='profile-form'>
					<div
						style={{ fontSize: "1.5rem", fontWeight: "900" }}
						className='text-center py-4'
					>
						CREATE CHANNEL
					</div>
					{error && <Message variant='danger'>{error}</Message>}
					{loading && <Loader />}
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Channel Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter Channel Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Channel Description</Form.Label>
							<textarea
								placeholder='Channel Description'
								className='form-control'
								rows='5'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</Form.Group>
						<div className='text-center mt-3'>
							<button type='submit' className='btn btn-success'>
								Create Channel
							</button>
						</div>
					</Form>
				</div>
			</FormContainer>
		</div>
	);
};

export default ChannelScreen;
