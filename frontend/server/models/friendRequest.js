const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const friendRequestSchema = new mongoose.Schema({
  user_email: String,
  friend_requests: []  
});

const friendReques = connection.model("Friend requests", friendRequestSchema);

module.exports = friendReques;
