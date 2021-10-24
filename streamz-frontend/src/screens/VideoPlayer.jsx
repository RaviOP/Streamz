import React from "react";
import videojs from "video.js";
import axios from "axios";
import { connect } from "react-redux";

class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stream: false,
			videoJsOptions: null,
		};
	}

	componentDidMount() {
		const config = {
			headers: {
				Authorization: `Bearer ${this.props.userLogin.userInfo.token}`,
			},
		};
		axios
			.get("/api/channel", {
				params: {
					name: this.props.match.params.name,
				},
				...config,
			})
			.then((res) => {
				console.log(res.data.stream_key);
				this.setState(
					{
						stream: true,
						videoJsOptions: {
							autoplay: true,
							controls: true,
							sources: [
								{
									src:
										"http://127.0.0.1:8000/live/" +
										res.data.channel[0].stream_key +
										"/index.m3u8",
									type: "application/x-mpegURL",
								},
							],
							fluid: true,
						},
					},
					() => {
						this.player = videojs(
							this.videoNode,
							this.state.videoJsOptions,
							function onPlayerReady() {
								console.log("onPlayerReady", this);
							}
						);
					}
				);
			});
	}

	componentWillUnmount() {
		if (this.player) {
			this.player.dispose();
		}
	}

	render() {
		return (
			<div className='profile-body'>
				<div className='row'>
					<div className='col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5'>
						{this.state.stream ? (
							<div data-vjs-player>
								<video
									ref={(node) => (this.videoNode = node)}
									className='video-js vjs-big-play-centered'
								/>
							</div>
						) : (
							" Loading ... "
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userLogin: state.userLogin,
	};
};
export default connect(mapStateToProps)(VideoPlayer);
