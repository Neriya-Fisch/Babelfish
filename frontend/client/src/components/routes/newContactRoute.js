const router = require("express").Router();

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
  const newContact = req.body;
  const userContacts = contacts.find(
    (user) => user.user_Email === userEmail
  );
  userContacts.contacts.push(newContact);
  res.json(userContacts.contacts);
});

router.get("/:userEmail", (req, res) => {
  const userEmail = req.params.userEmail;
  const userContacts = contacts.find(
    (user) => user.user_Email === userEmail
  );
  res.json(userContacts.contacts);
});

module.exports = router;