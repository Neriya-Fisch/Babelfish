const router = require("express").Router();
const mongoose = require("mongoose");

const contacts = [
  {
  user_Email: "or@gmail.com",
  contacts: [{
      email: 'gk@gmail.com',
      name: 'Gal Kaminka'
    },
    {
      email: 'ds@gmail.com',
      name: 'Dudi Sarna'
    },
    {
      email: 'es@gmail.com',
      name: 'Erez Sheiner'
    },
    {
      email: 'ep@gmail.com',
      name: 'Eli Porat'
    },]
  },
  {
    user_Email: "nr@gmail.com",
    contacts: [{
      email: 'gk@gmail.com',
        name: 'Gal Kaminka'
      },
      {
        email: 'ds@gmail.com',
        name: 'Dudi Sarna'
      },]
  }

  ]

// post request to add new contact to the user contacts list
router.post("/:user_email", (req, res) => {
  const userEmail = req.params.user_email
  const newContactDetails = req.body;

  const userContacts = contacts.find(
    (user) => user.user_Email === userEmail
  );
  userContacts.contacts.push(newContactDetails);

  var newContactSchema = new mongoose.Schema({
	user_email: String,
	new_contact: String,
});
  const connection = mongoose.createConnection(process.env.DB);
  var newContact = connection.model("Contacts", newContactSchema);
  newContact.create({ user_email: "userEmail", new_contact: "newContactDetails"}, function (err){
    if (err) return handleError(err);
  })
  res.json(userContacts.contacts);
});

router.get("/:user_email", (req, res) => {
  const userEmail = req.params.user_email;
  const userContacts = contacts.find(
    (user) => user.user_Email === userEmail
  );
  res.json(userContacts.contacts);
});

module.exports = router;