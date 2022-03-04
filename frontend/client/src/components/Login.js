import React, {useState } from 'react';
import { io} from 'socket.io-client'

export default function ChatBox() {
  const [Fdata, setFdata] = useState("string");
  const [savedNotes, setsavedNotes] = useState([]);
  const socket = io("http://localhost:3002")
  
  const handleSubmit = event => {
    event.preventDefault();
    var message = event.target.elements.message.value
    console.log("send form client: ", message)
    socket.emit('send-message', message)
    // var postCfg = {
    //   method:"POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body : JSON.stringify( {message : event.target.elements.message.value} )
    // } 
    // fetch("http://localhost:3001/send_message", postCfg)


  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <p>Write Your Message Here</p>
           <input name="message" onChange={setFdata}/>
         </label>
       <button type="submit">Submit</button>
       </fieldset>
       </form>
      
      <div className="box">
        <h2>Notes</h2>
        {savedNotes.map(n => (
        <p key={n}>{n}</p>
        ))}
      </div>
    </div>
  )
}