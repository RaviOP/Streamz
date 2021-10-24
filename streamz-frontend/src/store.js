import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	userDeleteProfileReducer,
	userLoginReducer,
	userProfileReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from "./reducers/userReducer";
import {
	channelCreateReducer,
	channelDeleteMyReducer,
	channelDetailMyReducer,
	channelDetailReducer,
	channelListAllReducer,
	channelUpdateMyReducer,
} from "./reducers/channelReducer";

const reducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userProfile: userProfileReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userDeleteProfile: userDeleteProfileReducer,
	channelCreate: channelCreateReducer,
	channelListAll: channelListAllReducer,
	channelDetailMy: channelDetailMyReducer,
	channelDetail: channelDetailReducer,
	channelUpdateMy: channelUpdateMyReducer,
	channelDeleteMy: channelDeleteMyReducer,
});

const userInfoFromStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

const channelInfoFromStorage = localStorage.getItem("channel")
	? JSON.parse(localStorage.getItem("channel"))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	channelDetailMy: { channel: channelInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
