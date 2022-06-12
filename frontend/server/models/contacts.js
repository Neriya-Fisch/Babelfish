const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const ContactsSchema = new mongoose.Schema({
  user_email: String,
  contacts: [],
});
const Contacts = connection.model("Contacts", ContactsSchema);

// Change contact_email new_message to true for the user
function changeNewMessageStatus(user_email, contact_email) {
  console.log("changeNewMessageStatus");
  Contacts.findOneAndUpdate(
    { user_email: user_email, "contacts.email": contact_email },
    { $set: { "contacts.$.new_message": true } },
    { new: true },
    function (error, user_details) {
      if (!user_details)
        console.log(error);
    }
  );
  console.log("after changeNewMessageStatus");
}

module.exports = {Contacts, changeNewMessageStatus};
