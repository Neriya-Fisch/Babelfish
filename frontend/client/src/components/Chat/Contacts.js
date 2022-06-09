import React,{useState,useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

const user = JSON.parse(localStorage.getItem("user"));

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const reciverEmail = window.location.pathname.split('/')[2]

  // get the contacts from the server function
  const getContacts = () => {
    // fetch the contacts from the server
    fetch('http://localhost:3001/contacts/' + user.email)
    .then(res => res.json())
    .then(data => {
      setContacts(data[0].contacts);
    })
    .catch(err => console.log(err));
  };

  // use effect to get the contacts
  useEffect(() => {
    var reciverEmail = window.location.pathname.split('/')[2]

    if (reciverEmail !== null) {
      // using ("read/:user_email/:contact_email/") endpoint to put false to new_message
      fetch('http://localhost:3001/contacts/read/' + user.email + '/' + reciverEmail)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err));
  }

    getContacts();
  }
  , []);
  

  // return contacts list as link to chat by id
  return (
    <ListGroup>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.email}>
          <a href={`/chat/${contact.email}`}>{contact.name}</a>
          {/* if contact.new_message is True add text "new message"  */}
          {contact.new_message && reciverEmail != contact.email ? <span> 😀 </span> : ""}
        </ListGroup.Item>
      ))}
    </ListGroup>

    );
}
