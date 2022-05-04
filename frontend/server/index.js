require("dotenv").config({path:__dirname+'/.env'});

const express = require("express");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const newContactRoute = require("../client/src/components/routes/newContactRoute")
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


messageHistory = [
  {
    user_email: "or@gmail.com",
    messages_by_id: [
      {
        id: "ds@gmail.com",
        messages:[
          {direction:"in", message:"Hello"},
          {direction:"out", message:"Hello"},
          {direction:"in", message:"there"},
          {direction:"out", message:"Hello \n you"},
          {direction:"in", message:"Hello"},
          {direction:"out", message:"Hello"},
          {direction:"in", message:"Hello"},
              ]
      },
      {
        id: "gk@gmail.com",
        messages:[
          {direction:"in", message:"Hello"},
          {direction:"out", message:"Hello"},
          {direction:"in", message:"there"},
              ]
      }
    ]
  }
];

// return message history by user name and user id using get request
app.get("/messages/:user_email/:reciver_email", (req, res) => {
  var user_email = req.params.user_email;
  var reciver_email = req.params.reciver_email;
  var message_db = messageHistory.find(
    (message) => message.user_email === user_email
  );
  console.log("message_db", message_db)
  var message_detail = message_db.messages_by_id.find(
    (message) => message.id === reciver_email
  );
  console.log("message_detail", message_detail)
  res.send(message_detail.messages);
});

// get request, return the user name by user email
app.get("/user_name/:user_email", (req, res) => {
  const user_email = req.params.user_email;
  // TODO: use the mongoDB to get the user name by user email, for now using the hardcoded user name
  const user_name = "Gal";
  res.json(user_name);
});

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/contacts", newContactRoute);

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
  socket.on("send-message", (message, user_email, reciver_email) =>{
    console.log("message:, ",message, "from: ", user_email, "to userId", reciver_email)
    const pythonProcess = spawn('python',["../translate.py", message]);
    pythonProcess.stdout.on('data', (data) => {
      console.log("from python:",data.toString())
      socket.to(user_name_to_id_map[reciver_email]).emit("recive-message", data.toString())
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
