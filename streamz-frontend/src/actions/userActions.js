import axios from "axios";
import { CHANNEL_DETAIL_MY_RESET } from "../constants/channelConstants";
import {
	USER_DELETE_PROFILE_FAIL,
	USER_DELETE_PROFILE_REQUEST,
	USER_DELETE_PROFILE_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_PROFILE_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_RESET,
	USER_PROFILE_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await axios.post("/api/users/login", { email, password });
		const response = { ...data.user, token: data.token };
		dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
		localStorage.setItem("user", JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("user");
	localStorage.removeItem("channel");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: CHANNEL_DETAIL_MY_RESET });
	dispatch({ type: USER_PROFILE_RESET });
};

export const register = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const { data } = await axios.post("/api/users", { email, password });
		const response = { ...data.user, token: data.token };
		dispatch({ type: USER_REGISTER_SUCCESS, payload: response });
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: response,
		});
		localStorage.setItem("user", JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getUserProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get("/api/users/me", config);
		dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const updateUserProfile = (password) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put("/api/users/me", { password }, config);
		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

		const response = { ...data.user, token: data.token };
		dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
		localStorage.setItem("user", JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUserProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_PROFILE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.delete("/api/users/me", config);
		dispatch({ type: USER_DELETE_PROFILE_SUCCESS });
	} catch (error) {
		dispatch({
			type: USER_DELETE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
