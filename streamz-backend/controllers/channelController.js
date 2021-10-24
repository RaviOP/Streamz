const Channel = require("../models/Channel");
const shortId = require("shortid");

const createChannel = async (req, res) => {
	try {
		const { name, description } = req.body;
		const channelExist = await Channel.findOne({ user: req._id });
		if (channelExist) {
			return res.status(200).send({ channel: channelExist });
		}
		const channel = new Channel({
			stream_key: shortId.generate(),
			name,
			description,
			user: req._id,
		});
		await channel.save();
		res.status(201).send(channel);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const getAllChannel = async (req, res) => {
	try {
		const pageSize = 10;
		const page = Number(req.query.pageNumber) || 1;

		const keyword =
			req.query.keyword && req.query.keyword.length > 0
				? {
						name: { $regex: req.query.keyword, $options: "i" },
				  }
				: {};
		const count = await Channel.countDocuments({ ...keyword });
		const channel = await Channel.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));
		if (!channel) {
			return res.status(404).send([]);
		}
		res.status(200).send({ channel, pages: Math.ceil(count / pageSize) });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getOurChannel = async (req, res) => {
	try {
		const channel = await Channel.findOne({
			user: req._id,
		});
		if (!channel) {
			return res.status(404).send({ message: "Channel Not Found" });
		}
		res.status(200).send(channel);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getChannelByName = async (req, res) => {
	try {
		const channel = await Channel.findOne({ name: req.params.name });
		if (!channel) {
			return res.status(404).send({ message: "Channel Not Found" });
		}
		res.status(200).send(channel);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const updateOurChannel = async (req, res) => {
	try {
		const { name, description } = req.body;
		const channel = await Channel.findOne({
			user: req._id,
		});
		if (!channel) {
			return res.status(404).send({ message: "Channel Not Found" });
		}
		channel.name = name || channel.name;
		channel.description = description || channel.description;
		await channel.save();
		res.status(200).send(channel);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const deleteOurChannel = async (req, res) => {
	try {
		const channel = await Channel.findOneAndDelete({
			user: req._id,
		});
		if (!channel) {
			return res.status(404).send({ message: "Channel Not Found" });
		}
		res.status(200).send(channel);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	createChannel,
	getAllChannel,
	getOurChannel,
	getChannelByName,
	updateOurChannel,
	deleteOurChannel,
};
