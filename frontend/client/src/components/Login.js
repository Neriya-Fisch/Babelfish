import React, {useState } from 'react';

 
export default function ChatBox() {
  const [Fdata, setFdata] = useState("string");

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.elements.message.value)
    
    var postCfg = {
      method:"POST",
      headers: {
        "Content-type": "application/json"
      },
      body : JSON.stringify( {"message" : "Hello World!"} )
    } 
    fetch("http://localhost:3001/send_message", postCfg)

  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <p>Write Your Message Here</p>
           <input name="message" onChange={setFdata}/>
         </label>
       </fieldset>
       <button type="submit">Submit</button>
      </form>
    </div>
  )
}