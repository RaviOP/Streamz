const mongoose = require("mongoose");

mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log(`Connected to Database`);
	})
	.catch((err) => {
		console.error(`Error: ${err.message}`);
	});
