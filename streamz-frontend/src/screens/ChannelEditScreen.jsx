import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyChannel, getMyChannelDetails, updateMyChannel } from "../actions/channelActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ChannelEditScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const channelDetail = useSelector((state) => state.channelDetailMy);
	const { loading, channel, error } = channelDetail;

	const channelUpdate = useSelector((state) => state.channelUpdateMy);
	const { success } = channelUpdate;

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		}
		if (!channel || !channel.name || success) {
			dispatch(getMyChannelDetails());
		} else {
			setName(channel.name);
			setDescription(channel.description);
		}
	}, [history, channel, userInfo, success, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		//Dispatch Update Channel
		dispatch(updateMyChannel(name, description));
	};

	const deleteHandler = (e) => {
		e.preventDefault();
		if (window.confirm("Are You Sure. Do You want to Delete your Channel?")) {
			dispatch(deleteMyChannel());
			history.push("/createChannel");
		}
	};
	return (
		<div className='profile-body'>
			<FormContainer>
				<Row>
					<Col className='profile-form'>
						<p className='heading'>Channel</p>
						{success && <Message variant='success'>Channel Updated</Message>}
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
							<div className='text-center mt-4'>
								<Button type='submit' size='sm' variant='outline-success'>
									Update Channel
								</Button>
							</div>
							<div className='text-center mt-4'>
								<Button
									type='button'
									size='sm'
									variant='outline-danger'
									onClick={deleteHandler}
								>
									Delete Channel
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</FormContainer>
		</div>
	);
};

export default ChannelEditScreen;
