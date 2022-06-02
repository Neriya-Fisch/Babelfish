const router = require("express").Router();
const userNameByEmail = require("../models/userNameByEmail")
const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DB);
const ContactsSchema = new mongoose.Schema({
user_email: String,
contacts: []
});
const Contacts = connection.model("Contacts", ContactsSchema);

// create local DB for the friends requests lists of all users,
// will added this to the mongoDB later.
friendRequests = []
// function to remove the user from the friend requests list
function removeUserFromFriendRequests(user_email, friend_email) {
  // remove the friend_email from user_email's friend requests list
  for (var i = 0; i < friendRequests.length; i++) {
    if (friendRequests[i].user_email === user_email) {
      friendRequests[i].friend_requests.splice(
        friendRequests[i].friend_requests.indexOf(friend_email),
        1
      );
    }
  }
}

// GET request to get all friend requests of the user.
router.get("/requests/:user_email", async (req, res) => {
  var user_email = req.params.user_email;
  var friend_requests = friendRequests.filter(
    (friendRequest) => friendRequest.user_email == user_email
  );
  res.send(friend_requests);
});

// post request to reject or to accept friend request.
router.post("/requests/answer", async (req, res) => {
  var user_email = req.body.user_email;
  var friend_request_email = req.body.friend_request_email;
  var answer = req.body.answer;
  if (answer == "accept") {
    const friend_request_name = await userNameByEmail(friend_request_email);

    if (friend_request_name == null)
    res.status(404).send({ message: "User is not exist" });

    Contacts.findOneAndUpdate(
      { user_email: user_email},
      { $push: { contacts: { name: friend_request_name, email: friend_request_email } } },
      { upsert: true, new: true},
      function (error, user_details) {
        if (user_details){
        }
        else
          res.send(error);
      }
    );
  }
  removeUserFromFriendRequests(user_email, friend_request_email);
  res.send(friendRequests);
});



// post request to add new contact to the user contacts list
router.post("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email
  const contactEmail = req.body.email;
  // if no friend request list for contactEmail, create one
  if (!friendRequests.some((friendRequest) => friendRequest.user_email == contactEmail)) {
    friendRequests.push({
      user_email: contactEmail,
      friend_requests: []
    });
  }
  // add userEmail to friendRequests list of contactEmail
  friendRequests.forEach((friendRequest) => {
    if (friendRequest.user_email == contactEmail) {
      friendRequest.friend_requests.push(userEmail);
    }
  });
});

router.get("/:user_email", async (req, res) => {
  const userEmail = req.params.user_email;
  var query = await Contacts.find({ user_email: userEmail}).select('contacts');
  res.send(query);
});

module.exports = router;