const router = require("express").Router();
const userNameByEmail = require("../models/userNameByEmail")
const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const ContactsSchema = new mongoose.Schema({
user_email: String,
contacts: []
});
const Contacts = connection.model("Contacts", ContactsSchema);

// post request to add new contact to the user contacts list
router.post("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email
  const contactEmail = req.body.email;
  const contactName = await userNameByEmail(contactEmail);
  if (contactName == null)
    res.status(404).send({ message: "User is not exist" });
  else{
    Contacts.findOneAndUpdate(
      { user_email: userEmail},
      { $push: { contacts: { name: contactName, email: contactEmail } } },
      { upsert: true, new: true},
      function (error, user_details) {
        if (user_details)
          res.send(JSON.parse(JSON.stringify(user_details.contacts)));
        else
          res.send(error);
      }
    );
  }
});

router.get("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  var query = await Contacts.find({ user_email: userEmail}).select('contacts');
  res.send(query);
});

module.exports = router;