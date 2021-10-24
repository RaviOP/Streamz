import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeScreen = ({ history }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push("/dashboard");
		}
	});

	return (
		<div className='profile-body'>
			<div className='pt-5 text-center'>
				<p>Create a Channel to start Livestreaming your Favourite Content</p>
				<p>Login to Watch Livestreams over the platform</p>
				<div className='mt-5'>
					<Link to='/login' className=' px-4 py-2 rounded-pill outline-order-button'>
						Login to Continue...
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
