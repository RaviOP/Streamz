import axios from "axios";
import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class DashboardScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			live_streams: [],
		};
	}

	componentDidMount() {
		if (!this.props.userLogin.userInfo) {
			this.props.history.push("/login");
		}
		this.getLiveStreams();
	}

	getLiveStreams() {
		axios.get("http://127.0.0.1:8000/api/streams").then((res) => {
			let streams = res.data;
			if (typeof (streams["live"] !== "undefined")) {
				this.getStreamsInfo(streams["live"]);
			}
		});
	}

	getStreamsInfo(live_streams) {
		axios
			.get("/api/streams/info", {
				params: {
					streams: live_streams,
				},
			})
			.then((res) => {
				this.setState(
					{
						live_streams: res.data,
					},
					() => {
						console.log(this.state);
					}
				);
			});
	}

	render() {
		let streams = this.state.live_streams.map((stream, index) => {
			return (
				<div className='stream m-2 col-xs-12 col-sm-12 col-md-3 col-lg-4' key={index}>
					<span className='live-label'>Live</span>
					<Link to={"/stream/" + stream.name}>
						<div>
							<img
								className='stream-thumbnail'
								src={"thumbnails/" + stream.stream_key + ".png"}
								alt='Thumbnail'
							/>
						</div>
					</Link>

					<span className='username'>{stream.name}</span>
				</div>
			);
		});
		return (
			<div className='profile-body'>
				<div className='container'>
					<Row className='pt-1'>
						<div className='col-sm-8'>
							<span className='heading mb-1' style={{ textAlign: "start" }}>
								LiveStreams
							</span>
						</div>
						<div className='col-sm-4 mt-1'>
							<Link
								to='/livestream'
								className='btn btn-primary'
								style={{ width: "100%" }}
							>
								Start Livestreaming
							</Link>
						</div>
					</Row>
					<hr className='m-0' />
					<Row className='pt-1'>
						{streams.length > 0 ? (
							streams
						) : (
							<div className='text-center text-danger'>No LiveStreams Found</div>
						)}
					</Row>
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
export default connect(mapStateToProps)(DashboardScreen);
