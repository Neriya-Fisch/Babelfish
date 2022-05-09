require("dotenv").config({path:__dirname+'/.env'});

const express = require("express");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const newContactRoute = require("./routes/contactsRoute")
const conversationRoute = require("./routes/conversationRoute")
const userFromEmail = require("./routes/userFromEmail")
const cors = require('cors');
const spawn = require("child_process").spawn;

const PORT = process.env.PORT || 3001;

const app = express();

// Add cors configatrion
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Add body parser
const bodyParser = require('body-parser');
const { allowedNodeEnvironmentFlags } = require("process");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/contacts", newContactRoute);
app.use("/messages", conversationRoute);
app.use("/user_name", userFromEmail);

// open socket connection, 
// using for chatBox consistent communication
const io = require("socket.io")(3002, {
  cors: {
    // TODO: change to all 
    origin: ['http://localhost:3000', 'http://localhost:3003']
  }
})

var user_name_to_id_map = {}

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
