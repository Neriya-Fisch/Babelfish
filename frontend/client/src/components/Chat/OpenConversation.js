import React, {useState, useEffect, useRef} from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSpeechSynthesis } from "react-speech-kit";

const user = JSON.parse(localStorage.getItem("user"));

const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true

export default function OpenConversation({socket}) {
  
  const user_lang = user.language

  mic.lang = user_lang

  const { speak, voices} = useSpeechSynthesis();
  const voices_lang = voices.filter(voice => voice.lang.includes(user_lang))
  
  // if voice_lang is empty, add the user language.
  // the language is not supported at the moment for TTS engine
  if (voices_lang.length === 0) {
    voices_lang.push({lang: user_lang, name: 'not supporting text to speech yet'})
  }
  const [reciverName, setReciverName] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false)
  const [voiceIndex, setVoiceIndex] = useState(null);
  const messagEnd = useRef(null)
  const voice = voices_lang[voiceIndex] || null;

  socket.on("recive-message", (message_in, senderEmail) => {
    var reciverEmail = window.location.pathname.split('/')[2]
    if(reciverEmail === senderEmail) {
      addMessage({direction: 'in', message_info: message_in})
    }
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
    var message_detail = {direction:"out", message_info:text}
    addMessage(message_detail);
    var userEmail = user.email
    var reciverEmail = window.location.pathname.split('/')[2]
    socket.emit('send-message', text, userEmail, reciverEmail)
    // clear the text field
    setText('');
  };
  
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
      (data[0].user_messages).forEach(msg =>{
        if(msg.partner_email == reciverEmail){
          setMessages(msg.messages_history);
          return;
        }
      }
      );
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (isListening) {
      console.log("after:", isListening)
      console.log("here")
      
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }
    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setText(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }, [isListening]);

  useEffect(() => {
      messagEnd.current?.scrollIntoView()
  }, [messages]);
      return (
      reciverName === null ?
      // center the text
      <div class="center">Welcome! chat with someone</div> :
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex flex-column flex-grow-1" >
        Converation with {reciverName}</div>
      <div className="flex-grow-1 overflow-auto">
      </div>
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
      {messages.map(message => (
      <div
      className={`my-1 d-flex flex-column ${message.direction === 'out' ? 'align-self-end align-items-end' : 'align-items-start'}`}
      >
      <span 
        className={`rounded px-2 py-1 ${message.direction === 'out' ? 'bg-primary text-white' : 'border'}`}>
        {message.message_info}
      </span >
      <div className={`text-muted small ${message.direction === 'out' ? 'text-right' : ''}`}>
                  {message.direction === 'in' ? reciverName : 'You'}
      <Button variant="outline-primary" onClick={() => { speak({text : message.message_info, voice})}}
      >Listen</Button>
      </div>
      </div>
        ))}
      <div ref={messagEnd} />
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
              <Button onClick={() => setIsListening(!isListening)} style={{backgroundColor: isListening ? 'red' : 'green'}}>
              {isListening ? 'Stop' : 'Record'}
              </Button>
              <Button type="submit" disabled={!text}>Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      <select
      id="voice"
      name="voice"
      value={voiceIndex || ''}
      onChange={(event) => {
        console.log(voices[event.target.value].lang)
        mic.lang = voices[event.target.value].lang
        setVoiceIndex(event.target.value);
      }}>
      <option value="">Default</option>
      {voices_lang.map((option, index) => (
        <option key={option.voiceURI} value={index}>
          {option.lang} - {option.name}
        </option>
      ))}
    </select>
    </div>
  )
}

