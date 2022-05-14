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

module.exports = function(io) {

  var user_name_to_id_map = {}
  const spawn = require("child_process").spawn;

  // Chat API
  io.on("connection", socket =>{
    // get message deatil from user, add it the message history and send to reciver.
    socket.on("send-message", async (message, sender, reciver) =>{

      // save the messsage for the sender
      await messages.findOneAndUpdate(
        { $or: [ { user_email: sender, 'user_messages.partner_email': reciver }, { user_email: sender } ] },
        { $set: { user_email: sender, 'user_messages.partner_email': reciver }, $addToSet: { 'user_messages.messages_history': { direction: 'out', message_info: message } } },
        { upsert: true, new: true},
      );

      console.log("message:, ",message, "from: ", sender, "to userId", reciver)
      const pythonProcess = spawn('python',["../translate.py", message]);
      pythonProcess.stdout.on('data', async (data) => {
        console.log("from python:",data.toString())
        socket.to(user_name_to_id_map[reciver]).emit("recive-message", data.toString())

      await messages.findOneAndUpdate(
        { $or: [ { user_email: reciver, 'user_messages.partner_email': sender }, { user_email: reciver } ] },
        { $set: { user_email: reciver, 'user_messages.partner_email': sender }, $addToSet: { 'user_messages.messages_history': { direction: 'in', message_info: data.toString() } } },
        { upsert: true, new: true},
      );
      });
    })
    socket.on("choose-user-name", (user_email) => {
      console.log("user email: ", user_email, "user socket id: ", socket.id)
      user_name_to_id_map[user_email] = socket.id
      
    })
  })
}
