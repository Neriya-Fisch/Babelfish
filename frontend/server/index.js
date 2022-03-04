const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const io = require("socket.io")(3002, {
  cors: {
    origin: ['http://localhost:3000']
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
  socket.on("send-message", (message) =>{
    console.log(message)
  })
}) 



app.post("/send_message", function(req,res){
  var a = JSON.stringify(req.body["message"])
  console.log(a)
  res.status(201).json({"some":"response"})

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
