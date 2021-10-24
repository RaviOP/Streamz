const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req._id = decoded._id;
		next();
	} catch (error) {
		res.status(401).json({ message: "You are Not Authenticated" });
	}
};

module.exports = auth;
