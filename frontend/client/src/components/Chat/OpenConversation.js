import React, {useState, useEffect, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

const user = JSON.parse(localStorage.getItem("user"));

export default function OpenConversation({socket}) {
  
  const [reciverName, setReciverName] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  // const setRef = useCallback(node => {
  //   if (node) {
  //     node.scrollIntoView({ smooth: true })
  //   }
  // }, [])

  socket.on("recive-message", (message_in) => {
    console.log(message_in)
    addMessage({direction: 'in', message: message_in})
  })


  // Add message to the message list
  function addMessage(message_detail){
    setMessages([...messages, message_detail])
  }
  
  // when submiting the from, add the message to the message list,
  // and show the new message list
  const handleSubmit = (e) => {
    e.preventDefault();

    // add the message to the message list
    var message_detail = {direction:"out", message:text}
    addMessage(message_detail);
    var userEmail = user.email
    var reciverEmail = window.location.pathname.split('/')[2]
    socket.emit('send-message', text, userEmail, reciverEmail)
    // clear the text field
    setText('');
  };
  
  // get user name from server using the /contacts/:id post api request
  // and get message history from the server using the user name and the user id
  useEffect(() => {
    var reciverEmail = window.location.pathname.split('/')[2]
    // get reciver name from server by Email, using GET request
    fetch('http://localhost:3001/user_name/' + reciverEmail)
    .then(res => res.json())
    .then(data => {
      var name = `${data[0].firstName} ${data[0].lastName}`
      setReciverName(name)
    })
    .catch(err => console.log(err));

    // get user messages from server by user name and user id
    // setMessages(message_db)
    fetch(`http://localhost:3001/messages/${user.email}/${reciverEmail}`)
    .then(res => res.json())
    .then(data => {
      setMessages(data);
    })
    .catch(err => console.log(err));
  }, []);

    return (
      <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column flex-grow-1" >
        Converation with {reciverName}</div>
      </div>
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
      {messages.map(message => (
      <div
      className={`my-1 d-flex flex-column ${message.direction === 'out' ? 'align-self-end align-items-end' : 'align-items-start'}`}
      >
      <span 
        className={`rounded px-2 py-1 ${message.direction === 'out' ? 'bg-primary text-white' : 'border'}`}>
        {message.message}
      </span >
      <div className={`text-muted small ${message.direction === 'out' ? 'text-right' : ''}`}>
                  {message.direction === 'in' ? reciverName : 'You'}
      </div>
      </div>
        ))}
      </div>
      </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{height: '75px', resize: 'none'}}
              />
              <Button type="submit">Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
    </div>
  )
}

