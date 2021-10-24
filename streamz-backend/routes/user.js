const express = require("express");
const {
	createUser,
	loginUser,
	readCurrentUser,
	updateCurrentUser,
	deleteCurrentUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

let router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/me", auth, readCurrentUser);

router.put("/me", auth, updateCurrentUser);

router.delete("/me", auth, deleteCurrentUser);

module.exports = router;
