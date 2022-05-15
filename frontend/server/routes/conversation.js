const router = require("express").Router();
const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const messagesSchema = new mongoose.Schema({
user_email: String,
user_messages: [{
  _id: false,
  partner_email: String,
  messages_history: [{_id: false, direction: String, message_info: String} ]
  }]
});

const messages = connection.model("Messages", messagesSchema);

// return message history by user name and user id using get request
router.get("/:user_email/:reciver_email", async (req, res) => {
  var userEmail = req.params.user_email;
  var reciver_email = req.params.reciver_email;
  var query = await messages.find({ user_email: userEmail, 'user_messages.partner_email': reciver_email}).select('user_messages.messages_history');
  res.send(query);
});

module.exports = router;