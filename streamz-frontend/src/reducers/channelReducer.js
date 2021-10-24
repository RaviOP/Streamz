import {
	CHANNEL_CREATE_FAIL,
	CHANNEL_CREATE_REQUEST,
	CHANNEL_CREATE_RESET,
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
	CHANNEL_LIST_RESET,
	CHANNEL_LIST_SUCCESS,
	CHANNEL_UPDATE_MY_FAIL,
	CHANNEL_UPDATE_MY_REQUEST,
	CHANNEL_UPDATE_MY_SUCCESS,
} from "../constants/channelConstants";

export const channelCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CHANNEL_CREATE_REQUEST:
			return { loading: true };
		case CHANNEL_CREATE_SUCCESS:
			return { loading: false, channel: action.payload };
		case CHANNEL_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case CHANNEL_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const channelListAllReducer = (state = { channels: [] }, action) => {
	switch (action.type) {
		case CHANNEL_LIST_REQUEST:
			return { loading: true, channels: [] };
		case CHANNEL_LIST_SUCCESS:
			return {
				loading: false,
				channels: action.payload.channels,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case CHANNEL_LIST_FAIL:
			return { loading: false, error: action.payload };
		case CHANNEL_LIST_RESET:
			return { channels: [] };
		default:
			return state;
	}
};

export const channelDetailReducer = (state = { channel: {} }, action) => {
	switch (action.type) {
		case CHANNEL_DETAIL_REQUEST:
			return { loading: true, ...state };
		case CHANNEL_DETAIL_SUCCESS:
			return { loading: false, channel: action.payload };
		case CHANNEL_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const channelDetailMyReducer = (state = { channel: {} }, action) => {
	switch (action.type) {
		case CHANNEL_DETAIL_MY_REQUEST:
			return { loading: true, ...state };
		case CHANNEL_DETAIL_MY_SUCCESS:
			return { loading: false, channel: action.payload };
		case CHANNEL_DETAIL_MY_FAIL:
			return { loading: false, error: action.payload };
		case CHANNEL_DETAIL_MY_RESET:
			return { channel: {} };
		default:
			return state;
	}
};

export const channelUpdateMyReducer = (state = { channel: {} }, action) => {
	switch (action.type) {
		case CHANNEL_UPDATE_MY_REQUEST:
			return { loading: true };
		case CHANNEL_UPDATE_MY_SUCCESS:
			return { loading: false, success: true, channel: action.payload };
		case CHANNEL_UPDATE_MY_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const channelDeleteMyReducer = (state = {}, action) => {
	switch (action.type) {
		case CHANNEL_DELETE_MY_REQUEST:
			return { loading: true, ...state };
		case CHANNEL_DELETE_MY_SUCCESS:
			return { loading: false, success: true };
		case CHANNEL_DELETE_MY_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
