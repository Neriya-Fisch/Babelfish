const Messages = require("../models/messages");

// get user lang by user Email
function user_email_to_lang(user_email) {
	  
	var lang = "en";
	return lang;
}


module.exports = function (io) {

  var user_name_to_id_map = {};
  const spawn = require("child_process").spawn;

  // Chat API
  io.on("connection", socket =>{
    // get message deatil from user, add it the message history and send to reciver.
    socket.on("send-message", async (message, sender, reciver) =>{
      // save the messsage for the sender
      await Messages.findOneAndUpdate(
        {
          $or: [
            { user_email: sender, "user_messages.partner_email": reciver },
            { user_email: sender },
          ],
        },
        {
          $set: { user_email: sender, "user_messages.partner_email": reciver },
          $addToSet: {
            "user_messages.messages_history": {
              direction: "out",
              message_info: message,
            },
          },
        },
        { upsert: true, new: true }
      );

      var reciver_lang = user_email_to_lang(reciver);
      var sender_lang = user_email_to_lang(sender);
      const pythonProcess = spawn("python", [
        "../translate.py",
        message,
        reciver_lang,
        sender_lang,
      ]);
      pythonProcess.stdout.on("data", async (data) => {
        socket
          .to(user_name_to_id_map[reciver])
          .emit("recive-message", data.toString());

        await Messages.findOneAndUpdate(
          {
            $or: [
              { user_email: reciver, "user_messages.partner_email": sender },
              { user_email: reciver },
            ],
          },
          {
            $set: {
              user_email: reciver,
              "user_messages.partner_email": sender,
            },
            $addToSet: {
              "user_messages.messages_history": {
                direction: "in",
                message_info: data.toString(),
              },
            },
          },
          { upsert: true, new: true }
        );
      });
    });
    socket.on("choose-user-name", (user_email) => {
      user_name_to_id_map[user_email] = socket.id;
    });
  });
};
