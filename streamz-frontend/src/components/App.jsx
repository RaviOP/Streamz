import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ChannelCreateScreen from "../screens/ChannelCreateScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChannelEditScreen from "../screens/ChannelEditScreen";
import LivestreamScreen from "../screens/LivestreamScreen";
import VideoPlayer from "../screens/VideoPlayer";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path='/' exact component={HomeScreen} />
				<Route path='/login' component={LoginScreen} />
				<Route path='/register' component={RegisterScreen} />
				<Route path='/profile' component={ProfileScreen} />
				<Route path='/dashboard' component={DashboardScreen} />
				<Route path='/createChannel' component={ChannelCreateScreen} />
				<Route path='/channel' component={ChannelEditScreen} />
				<Route path='/livestream' component={LivestreamScreen} />
				<Route exact path='/stream/:name' render={(props) => <VideoPlayer {...props} />} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
