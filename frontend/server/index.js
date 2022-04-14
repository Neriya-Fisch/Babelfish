require("dotenv").config({path:__dirname+'/.env'});

const express = require("express");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require('cors');

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
    userName: "ORYANIV",
    messages_by_id: [
      {
        id: "2",
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
        id: "3",
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
app.get("/messages/:userName/:userId", (req, res) => {
  var userName = req.params.userName;
  var userId = req.params.userId;
  var message_db = messageHistory.find(message => message.userName === userName);
  var message_by_id = message_db.messages_by_id.find(message => message.id === userId);
  res.send(message_by_id.messages);
});

// return message history by user name
app.get("/messages/:userName", (req, res) => {
  const userId = req.params.userName;
  const userMessages = messageHistory.find(
    (user) => user.userName === parseInt(userId)
  );
  res.json(userMessages);
});


const contacts = [
  {
    id: '1',
    name: 'Gal Kaminka'
  },
  {
    id: '2',
    name: 'Dudi Sarna'
  },
  {
    id: '3',
    name: 'Erez Sheiner'
  },
  {
    id: '4',
    name: 'Eli Porat'
  },
]

// get user name by id
function getUserNameById(id) {
  // if found return user name
  const user = contacts.find((user) => user.id === id);
  if (user) {
    return user.name;
  }
}

// Get request to return contacts
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Post request to get contact by id
app.post("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find(contact => contact.id === id);
  res.json(contact);
});

// post request to create new contact
app.post("/contacts", (req, res) => {
  const { name } = req.body;
  const newContact = {
    id: Math.random().toString(36).substr(2, 9),
    name
  };
  contacts.push(newContact);
  res.json(newContact);
});

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const spawn = require("child_process").spawn;

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
  console.log(socket.id)
  // get message deatil from user, add it the message history and send to reciver.
  socket.on("send-message", (message, user_name, reciver_id) =>{
    console.log("message:, ",message, "from: ", user_name, "to userId", reciver_id)
    reciver_name = getUserNameById(reciver_id)
    console.log("reciver_name: ", reciver_name)
    const pythonProcess = spawn('python',["../translate.py", message]);
    pythonProcess.stdout.on('data', (data) => {
      console.log("from python:",data.toString())
      socket.to(user_name_to_id_map[reciver_name]).emit("recive-message", data.toString())
    });
  })
  socket.on("choose-user-name", (my_user_name) => {
    console.log("Your new user name is: ", my_user_name)
    user_name_to_id_map[my_user_name] = socket.id
    
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
