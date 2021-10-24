const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Email is Required"],
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Please Enter a Valid Email");
				}
			},
		},
		password: {
			type: String,
			required: [true, "Passwprd is Required"],
			trim: true,
			minlength: [6, "Minimum length of password should be atleast 6 character"],
		},
	},
	{
		timestamps: true,
		toJSON: {
			versionKey: false,
			transform(doc, ret) {
				delete ret.password;
			},
		},
	}
);

userSchema.plugin(uniqueValidator);

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Email or Password is Incorrect");
	}
	const isMatched = await bcrypt.compare(password, user.password);
	if (!isMatched) {
		throw new Error("Email or Password is Incorrect");
	}
	return user;
};

userSchema.methods.generateAuthToken = async function () {
	try {
		const token = await jwt.sign(
			{
				_id: this._id.toString(),
			},
			process.env.JWT_SECRET_KEY
		);
		return token;
	} catch (error) {
		throw new Error(error.message);
	}
};

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
