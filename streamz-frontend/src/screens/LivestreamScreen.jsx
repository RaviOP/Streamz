import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const Livestream = ({ history }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const channelDetail = useSelector((state) => state.channelDetailMy);
	const { loading, channel, error } = channelDetail;

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		}
		if (!channel || !channel.name) {
			history.push("/createChannel");
		}
	}, [userInfo, history, channel]);

	return (
		<div className='profile-body'>
			<Container>
				<Link to='/dashboard' className='mt-3 px-4 py-2 rounded-pill btn btn-dark'>
					Go Back
				</Link>
				<div className='cart-body'>
					<Card className='cart-card'>
						<div className='contrainer'>
							<div className='row'>
								<div className='col-sm-7 cart text-center'>
									<h3>To Start Livestreaming</h3>
									<p>Download Open Broadcast Software</p>
									<a href='https://obsproject.com/'>https://obsproject.com/</a>
									<p>And install it on your PC</p>
									<p>Go to Settings `&gt;` Stream</p>
									<p>Select Custom service and enter</p>
									<p class='text-info'>rtmp://127.0.0.1:1935/live</p>
									<p>in Server input.</p>
									<p>Enter the Stream Key Correctly and save</p>
								</div>
								<div className='col-sm-5 cart-summary text-center'>
									{loading ? (
										<Loader />
									) : error ? (
										<Message variant='danger'>{error}</Message>
									) : (
										channel &&
										channel.name && (
											<div>
												<h3>Channel Information</h3>
												<p>
													<span className='text-success'>Name:</span>{" "}
													{channel.name}
												</p>
												<p>
													<span className='text-success'>
														Description:
													</span>{" "}
													{channel.description}
												</p>
												<p>
													<span className='text-success'>
														Stream Key:
													</span>{" "}
													{channel.stream_key}
												</p>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					</Card>
				</div>
			</Container>
		</div>
	);
};

export default Livestream;
