const express = require("express");
const {
	createChannel,
	getAllChannel,
	getChannelByName,
	getOurChannel,
	deleteOurChannel,
	updateOurChannel,
} = require("../controllers/channelController");
const auth = require("../middlewares/auth");

let router = express.Router();

router.post("/", auth, createChannel);
router.get("/", auth, getAllChannel);

router.get("/me", auth, getOurChannel);

router.put("/me", auth, updateOurChannel);
router.delete("/me", auth, deleteOurChannel);

router.get("/:name", auth, getChannelByName);

module.exports = router;
