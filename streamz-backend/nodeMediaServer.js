const NodeMediaServer = require("node-media-server");
const config = require("./config/default").rtmp_server;
const Channel = require("./models/Channel");
const helpers = require("./helper/helpers");

const nms = new NodeMediaServer(config);
const getStreamKeyFromStreamPath = (path) => {
	let parts = path.split("/");
	return parts[parts.length - 1];
};
nms.on("prePublish", async (id, StreamPath, args) => {
	let stream_key = getStreamKeyFromStreamPath(StreamPath);
	console.log(
		"[NodeEvent on prePublish]",
		`id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
	);

	Channel.findOne({ stream_key })
		.then((channel) => {
			if (!channel) {
				throw new Error("Stream Key Does not Match");
			} else {
				helpers.generateStreamThumbnail(stream_key);
			}
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

module.exports = nms;
