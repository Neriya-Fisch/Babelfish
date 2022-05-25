const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const messagesSchema = new mongoose.Schema({
  user_email: String,
  user_messages: [
    {
      _id: false,
      partner_email: String,
      messages_history: [
        { _id: false, direction: String, message_info: String },
      ],
    },
  ],
});

const Messages = connection.model("Messages", messagesSchema);

module.exports = Messages;