const router = require("express").Router();
const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});
const User = connection.model("user", userSchema);


// get request, return the user name by user email
router.get("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  var query = await User.find({ email: userEmail});
  res.send(query);
});

module.exports = router;