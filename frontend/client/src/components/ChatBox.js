import React, {useState} from 'react';
import { io} from 'socket.io-client'


// initial socket connection with server
const socket = io("http://localhost:3002");

socket.on('connect', (socket) => {
   console.log('socket connected', socket);
})


export default function ChatBox() {
  const [SavedMessages, setSavedMessages] = useState([]);
  
  socket.on("recive-message", (message) => {
    console.log(message)
    addMessage(message)
  })

  // Add message to the message list
  function addMessage(message){
    setSavedMessages([...SavedMessages, message])
  }
  
  // function called when changing user name
  const changeUserHandler = event => {

    event.preventDefault();
    var my_user_name = event.target.elements.user_name.value
    socket.emit('choose-user-name',my_user_name)
  }

  // function called when sending message to another user.
  const handleSend = event => {

    event.preventDefault();
    var message = event.target.elements.message.value
    var user_name = event.target.elements.userId.value
    console.log("send form client: ", message)
    socket.emit('send-message', message, user_name)

  }

  return (
    <div className="wrapper">
      <form onSubmit={changeUserHandler}>
        <fieldset>
          <label>
            <p> Choose Your User Name</p>
            <input name="user_name"/>
          </label>
          <button type="submit"> Change! </button>
        </fieldset>
      </form>
      <form onSubmit={handleSend}>
      <fieldset>
         <label>
           <p>Send Message To (user I.D)</p>
           <input name="userId"/>
           <p>Write Your Message Here</p>
           <input name="message"/>
         </label>
       <button type="submit"> Send! </button>
       </fieldset>
       </form>   
      <div className="box">
        <h2>Message Recived</h2>
        {SavedMessages.map(n => (
        <p key={n}>{n}</p>
        ))}
      </div>
    </div>
  )
}