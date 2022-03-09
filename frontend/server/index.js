

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const spawn = require("child_process").spawn;

// open socket connection, 
// using for chatBox consistent communication
const io = require("socket.io")(3002, {
  cors: {
    // TODO: change to all 
    origin: ['http://localhost:3000', 'http://localhost:3003']
  }
})

// Add cors configatrion
const cors = require('cors');
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
var user_name_to_id_map = {}

// Add body patser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// hello world get requast
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
// Chat communication API
io.on("connection", socket =>{
  console.log(socket.id)
  // get message from user and send it to another user.
  socket.on("send-message", (message, user_name) =>{
    console.log("message:, ",message, "to: ", user_name)
    const pythonProcess = spawn('python',["../translate.py", message]);
    pythonProcess.stdout.on('data', (data) => {
      console.log("from python:",data.toString())
      socket.to(user_name_to_id_map[user_name]).emit("recive-message", data.toString())
        // return data.toString()
    });
    // socket.to(user_name_to_id_map[user_name]).emit("recive-message", translated_message)
  })
  socket.on("choose-user-name", (my_user_name) => {
    console.log("Your new user name is: ", my_user_name)
    user_name_to_id_map[my_user_name] = socket.id
    
  })
}) 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
