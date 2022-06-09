const router = require("express").Router();
const userNameByEmail = require("../models/userNameByEmail");
const friendRequests = require("../models/friendRequest");
const {Contacts} = require("../models/contacts");

// function to remove the user from the friend requests list
async function removeUserFromFriendRequests(user_email, friend_email) {
  await friendRequests.updateOne(
    { user_email: user_email },
    { $pull: { friend_requests: friend_email } }
  );
  return await friendRequests
    .findOne({ user_email: user_email })
    .then(function (user) {
      return user.friend_requests;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
}

// GET request to get all friend requests of the user.
router.get("/requests/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  var query = await friendRequests
    .find({ user_email: userEmail })
    .select("friend_requests");
  res.send(query);
});

// post request to reject or to accept friend request.
router.post("/requests/answer", async (req, res) => {
  var user_email = req.body.user_email;
  var friend_request_email = req.body.friend_request_email;
  var answer = req.body.answer;
  if (answer == "accept") {
    const friend_request_name = await userNameByEmail(friend_request_email);
    const user_name = await userNameByEmail(user_email);

    Contacts.findOneAndUpdate(
      { user_email: user_email},
      { $push: { contacts: { name: friend_request_name, email: friend_request_email, new_message: false } } },
      { upsert: true, new: true},
      function (error, user_details) {
        if (!user_details) res.send(error);
      }
    );
    Contacts.findOneAndUpdate(
      { user_email: friend_request_email},
      { $push: { contacts: { name: user_name, email: user_email, new_message: false } } },
      { upsert: true, new: true},
      function (error, user_details) {
        if (!user_details) res.send(error);
      }
    );
  }
  updatedFriendRequestList = await removeUserFromFriendRequests(
    user_email,
    friend_request_email
  );
  res.send(updatedFriendRequestList);
});

// post request to add new contact to the user contacts list
router.post("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  const contactEmail = req.body.email;
  const user_name = await userNameByEmail(contactEmail);
  if (user_name == null) {
    res.status(404).send({ message: "User is not exist" });

  }

  friendRequests.findOneAndUpdate(
    { user_email: contactEmail },
    {
      $push: {
        friend_requests: userEmail,
      },
    },
    { upsert: true, new: true },
    function (error, user_details) {
      if (!user_details) res.send(error);
    }
  );
});

router.get("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  var query = await Contacts.find({ user_email: userEmail}).select("contacts");
  res.send(query);
});

// change new_message to false for all contacts of the user
router.post("/:user_email/read", async (req, res) => {
  const userEmail = req.params.user_email;
  Contacts.findOneAndUpdate(
    { user_email: userEmail},
    { $set: { "contacts.$.new_message": false } },
    { new: true },
    function (error, user_details) {
      if (!user_details)
        res.send(error);
    }
  );
  var query = await Contacts.find({ user_email: userEmail}).select('contacts');
  res.send(query);
});

// Change contact_email new_message to true or false for the user
function changeNewMessageStatus(user_email, contact_email, new_message) {
  Contacts.findOneAndUpdate(
    { user_email: user_email, "contacts.email": contact_email },
    { $set: { "contacts.$.new_message": new_message } },
    { new: true },
    function (error, user_details) {
      if (!user_details)
        console.log(error);
    }
  );
}

// GET request to change new_message status to false
router.get("/read/:user_email/:contact_email/", async (req, res) => {
  console.log("in get request");
  const userEmail = req.params.user_email;
  const contactEmail = req.params.contact_email;
  changeNewMessageStatus(userEmail, contactEmail, false);
  // response with new contact list
  var query = await Contacts.find({ user_email: userEmail}).select('contacts');
  res.send(query);
});

module.exports = router;
