import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

const user = JSON.parse(localStorage.getItem("user"));

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  // get the contacts from the server function
  const getContacts = () => {
    // fetch the contacts from the server
    fetch("http://localhost:3001/contacts/" + user.email)
      .then((res) => res.json())
      .then((data) => {
        setContacts(data[0].contacts);
      })
      .catch((err) => console.log(err));
  };

  function removeContact(contactEmail) {
    fetch("http://localhost:3001/contacts/remove/" + user.email, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactEmail: contactEmail,
      }),
    }).catch((err) => console.log(err));
  }

  // use effect to get the contacts
  useEffect(() => {
    getContacts();
  }, [removeContact]);

  // return contacts list as link to chat by id
  return (
    <ListGroup>
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.email}>
          <a href={`/chat/${contact.email}`}>{contact.name}</a>
          <button
            style={{ float: "right" }}
            onClick={() => removeContact(contact.email)}
          >
            Remove
          </button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
