import React,{useState,useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

const user = JSON.parse(localStorage.getItem("user"));

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

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

  getContacts();

  // return contacts list as link to chat by id
  return (
    <ListGroup>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.email}>
          <a href={`/chat/${contact.email}`}>{contact.name}</a>
        </ListGroup.Item>
      ))}
    </ListGroup>

    );
}
