module.exports = function(io) {

  var user_name_to_id_map = {}
  const spawn = require("child_process").spawn;

  // Chat API
  io.on("connection", socket =>{
    // get message deatil from user, add it the message history and send to reciver.
    socket.on("send-message", (message, sender, reciver) =>{
      console.log("message:, ",message, "from: ", sender, "to userId", reciver)
      const pythonProcess = spawn('python',["../translate.py", message]);
      pythonProcess.stdout.on('data', (data) => {
        console.log("from python:",data.toString())
        socket.to(user_name_to_id_map[reciver]).emit("recive-message", data.toString())
      });
    })
    socket.on("choose-user-name", (user_email) => {
      console.log("user email: ", user_email, "user socket id: ", socket.id)
      user_name_to_id_map[user_email] = socket.id
      
    })
  })
}
