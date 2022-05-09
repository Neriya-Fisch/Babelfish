const router = require("express").Router();
const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
// const ContactsSchema = new mongoose.Schema({
// user_email: String,
// contacts: []
// });
// const Contacts = connection.model("Contacts", ContactsSchema);

messageHistory = [
  {
    user_email: "or@gmail.com",
    messages_by_id: [
      {
        id: "ds@gmail.com",
        messages:[
          {direction:"in", message:"Hello"},
          {direction:"out", message:"Hello"},
          {direction:"in", message:"there"},
          {direction:"out", message:"Hello \n you"},
          {direction:"in", message:"Hello"},
          {direction:"out", message:"Hello"},
          {direction:"in", message:"Hello"},
              ]
      },
      {
        id: "gk@gmail.com",
        messages:[
          {direction:"in", message:"Hello"},
          {direction:"out", message:"Hello"},
          {direction:"in", message:"there"},
              ]
      }
    ]
  }
];

// return message history by user name and user id using get request
router.get("/:user_email/:reciver_email", (req, res) => {
  var user_email = req.params.user_email;
  var reciver_email = req.params.reciver_email;
  var message_db = messageHistory.find(
    (message) => message.user_email === user_email
  );
  console.log("message_db", message_db)
  var message_detail = message_db.messages_by_id.find(
    (message) => message.id === reciver_email
  );
  console.log("message_detail", message_detail)
  res.send(message_detail.messages);
});


module.exports = router;