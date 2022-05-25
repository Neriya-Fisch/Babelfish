const router = require("express").Router();
const { User } = require("../models/user");

// get request, return the user name by user email
router.get("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  var query = await User.find({ email: userEmail});
  res.send(query);
});

module.exports = router;