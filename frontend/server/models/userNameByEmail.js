const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	language: { type: String, required: true },
	password: { type: String, required: true },
});
const User = connection.model("user", userSchema);

var userNameByEmail = async (userEmail) => {
		var query = await User.find({ email: userEmail});
		fullName = `${query[0].firstName} ${query[0].lastName}`
		return fullName;
};

module.exports = userNameByEmail;