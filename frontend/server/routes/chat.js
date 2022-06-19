const Messages = require("../models/messages");
const { User } = require("../models/user");
const {changeNewMessageStatus} = require("../models/contacts");

// get user lang by user Email
async function user_email_to_lang(user_email) {
  return await User.findOne({ email: user_email })
    .then(function (user) {
      return  user.language;
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = function (io) {
  async function save(message, sender, reciver, dir) {
    var query1 = await Messages.findOne({ user_email: sender });
    if (query1 == null) {
      await Messages.create({
        user_email: sender,
        user_messages: {
          partner_email: reciver,
          messages_history: [
            {
              direction: dir,
              message_info: message,
            },
          ],
        },
      });
      return;
    }
    var query2 = await Messages.findOne({
      user_email: sender,
      "user_messages.partner_email": reciver,
    });

    if (query2 == null) {
      await Messages.findOneAndUpdate(
        { user_email: sender },
        {
          $push: {
            user_messages: {
              partner_email: reciver,
              messages_history: [
                {
                  direction: dir,
                  message_info: message,
                },
              ],
            },
          },
        },
        { upsert: true, new: true }
      );
      return;
    }

    await Messages.findOneAndUpdate(
      {
        user_email: sender,
        user_messages: { $elemMatch: { partner_email: reciver } },
      },
      {
        $push: {
          "user_messages.$.messages_history": {
            direction: dir,
            message_info: message,
          },
        },
      },
      { upsert: true, new: true }
    );
  }

  var user_name_to_id_map = {};
  const spawn = require("child_process").spawn;

  // Chat API
  io.on("connection", (socket) => {
    // get message deatil from user, add it the message history and send to reciver.
    socket.on("send-message", async (message, sender, reciver) => {
      // save the messsage for the sender
      save(message, sender, reciver, 'out');
      var reciver_lang = await user_email_to_lang(reciver)
      .then(function (lang) {
        return lang;
      });
      const pythonProcess = spawn("python", [
        "server/translate/translate.py",
        message,
        reciver_lang,
      ]);
      pythonProcess.stdout.on("data", async (data) => {
        var translateMessage = data.toString()
        socket
        .to(user_name_to_id_map[reciver])
        .emit("recive-message", translateMessage, sender);
        changeNewMessageStatus(reciver, sender, true);
        save(translateMessage, reciver, sender, "in");
      });
      pythonProcess.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
      }
      );
    });
    
    socket.on("choose-user-name", (user_email) => {
      user_name_to_id_map[user_email] = socket.id;
    });
  });
};
