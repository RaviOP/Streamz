const User = require("../models/User");

const createUser = async (req, res) => {
	try {
		let { email, password } = req.body;
		const user = new User({
			email,
			password,
		});
		const token = await user.generateAuthToken();
		await user.save();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();
		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const readCurrentUser = async (req, res) => {
	try {
		let user = await User.findById(req._id);
		if (!user) {
			return res.status(404).send({ message: "User Not Found" });
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const updateCurrentUser = async (req, res) => {
	try {
		let { password } = req.body;
		let user = await User.findById(req._id);
		if (!user) {
			return res.status(404).send({ message: "User Not Found" });
		}
		if (password) {
			user.password = password || user.password;
			await user.save();
			const token = await user.generateAuthToken();
			res.status(200).send({ user, token });
		} else {
			res.status(200).send(user);
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const deleteCurrentUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req._id);
		if (!user) {
			return res.status(404).send({ message: "User Not Found" });
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = { readCurrentUser, loginUser, createUser, updateCurrentUser, deleteCurrentUser };
