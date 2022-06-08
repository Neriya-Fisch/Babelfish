const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const ContactsSchema = new mongoose.Schema({
  user_email: String,
  contacts: [],
});
const Contacts = connection.model("Contacts", ContactsSchema);

module.exports = Contacts;
