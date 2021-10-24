const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
	{
		stream_key: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: [true, "Channel Name is Required"],
			unique: true,
		},
		description: {
			type: String,
			required: [true, "Channel Description is Required"],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

channelSchema.index({ name: 1 });

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
