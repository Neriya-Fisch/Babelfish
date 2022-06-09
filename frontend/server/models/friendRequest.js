const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const friendRequestsSchema = new mongoose.Schema({
  user_email: String,
  friend_requests: []  
});

const friendRequests = connection.model("Friend requests", friendRequestsSchema);

module.exports = friendRequests;
