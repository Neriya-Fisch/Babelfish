import React,{useState,useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  // get the contacts from the server function
  const getContacts = () => {
    // fetch the contacts from the server
    fetch('http://localhost:3001/contacts')
    .then(res => res.json())
    .then(data => {
      console.log("data")
      setContacts(data);
    })
    .catch(err => console.log(err));
  };

// run get contacts function when the component is mounted
  useEffect(() => {
    getContacts();
  }, []);

  // return contacts list as link to chat by id
  return (
    <ListGroup>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          <a href={`/chat/${window.location.pathname.split('/')[2]}/${contact.id}`}>{contact.name}</a>
        </ListGroup.Item>
      ))}
    </ListGroup>

    );
}
