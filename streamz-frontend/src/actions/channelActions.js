import axios from "axios";
import {
	CHANNEL_CREATE_FAIL,
	CHANNEL_CREATE_REQUEST,
	CHANNEL_CREATE_SUCCESS,
	CHANNEL_DELETE_MY_FAIL,
	CHANNEL_DELETE_MY_REQUEST,
	CHANNEL_DELETE_MY_SUCCESS,
	CHANNEL_DETAIL_FAIL,
	CHANNEL_DETAIL_MY_FAIL,
	CHANNEL_DETAIL_MY_REQUEST,
	CHANNEL_DETAIL_MY_RESET,
	CHANNEL_DETAIL_MY_SUCCESS,
	CHANNEL_DETAIL_REQUEST,
	CHANNEL_DETAIL_SUCCESS,
	CHANNEL_LIST_FAIL,
	CHANNEL_LIST_REQUEST,
	CHANNEL_LIST_SUCCESS,
	CHANNEL_UPDATE_MY_FAIL,
	CHANNEL_UPDATE_MY_REQUEST,
	CHANNEL_UPDATE_MY_SUCCESS,
} from "../constants/channelConstants";

export const listChannels =
	(keyword = "", pageNumber) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: CHANNEL_LIST_REQUEST });
			const { userLogin } = getState();
			const { userInfo } = userLogin;
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.get(
				`/api/channel?keyword=${keyword}&pageNumber=${pageNumber}`,
				config
			);
			if (data) {
				dispatch({ type: CHANNEL_LIST_SUCCESS, payload: data });
			}
		} catch (error) {
			dispatch({
				type: CHANNEL_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const createChannel = (name, description) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CHANNEL_CREATE_REQUEST,
		});
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/channel`, { name, description }, config);
		dispatch({
			type: CHANNEL_CREATE_SUCCESS,
			payload: data,
		});
		dispatch({
			type: CHANNEL_DETAIL_MY_SUCCESS,
			payload: data,
		});
		localStorage.setItem("channel", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CHANNEL_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getChannelDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: CHANNEL_DETAIL_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/channel/${id}`, config);
		if (data) {
			dispatch({ type: CHANNEL_DETAIL_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({
			type: CHANNEL_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getMyChannelDetails = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CHANNEL_DETAIL_MY_REQUEST });
		dispatch({ type: CHANNEL_DETAIL_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/channel/me`, config);
		if (data) {
			dispatch({ type: CHANNEL_DETAIL_MY_SUCCESS, payload: data });
		}
		localStorage.setItem("channel", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CHANNEL_DETAIL_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateMyChannel = (name, description) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CHANNEL_UPDATE_MY_REQUEST,
		});
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/channel/me`, { name, description }, config);
		dispatch({
			type: CHANNEL_UPDATE_MY_SUCCESS,
			payload: data,
		});
		localStorage.setItem("channel", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: CHANNEL_UPDATE_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteMyChannel = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CHANNEL_DELETE_MY_REQUEST,
		});
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.delete(`/api/channel/me`, config);
		dispatch({
			type: CHANNEL_DELETE_MY_SUCCESS,
		});
		dispatch({
			type: CHANNEL_DETAIL_MY_RESET,
		});
		localStorage.removeItem("channel");
	} catch (error) {
		dispatch({
			type: CHANNEL_DELETE_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
