const router = require("express").Router();
const Messages = require("../models/messages");

// return message history by user name and user id using get request
router.get("/:user_email/:reciver_email", async (req, res) => {
  var userEmail = req.params.user_email;
  var reciver_email = req.params.reciver_email;
  var query = await Messages
    .find({
      user_email: userEmail,
      "user_messages.partner_email": reciver_email,
    })
    .select("user_messages.messages_history");
  res.send(query);
});

module.exports = router;
