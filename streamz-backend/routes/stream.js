const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Channel = require("../models/Channel");
const User = require("../models/User");

router.get("/info", async (req, res) => {
	try {
		if (req.query.streams) {
			let streams = JSON.parse(req.query.streams);
			let query = { $or: [] };
			for (let stream in streams) {
				if (!streams.hasOwnProperty(stream)) continue;
				query.$or.push({ stream_key: stream });
			}
			const channel = await Channel.find(query);
			if (channel) {
				return res.status(200).send(channel);
			}
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

module.exports = router;
