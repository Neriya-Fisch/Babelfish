import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const user = JSON.parse(localStorage.getItem("user"));

export default function NewContacts({ closeModal }) {
  const userEmailRef = useRef();

  function refreshPage() {
    window.location.reload(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    var reciver_user_email = userEmailRef.current.value;
    // using the server to add the user to the contacts list of the user
    fetch("http://localhost:3001/contacts/" + user.email, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: reciver_user_email,
      }),
    }).then((res) => {
      if (res.ok) {
        res = res.json();
        console.log(res);
        refreshPage();
        // else alert the error mwssage
      } else {
        // if res number is 405 then the user is already in the contacts list
        if (res.status === 405) {
          alert("The user is already on the contacts list");
        }
        // if res number is 404 then the user is not in the database
        else if (res.status === 404) {
          alert(`User with email "${reciver_user_email}" is not exist`);
        }
        // if res number is 407 then the user can't add himself
        else if (res.status === 409) {
          alert("You can not add yourself");
        }
      }
    });
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Send a Friend Request</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User Email</Form.Label>
            <Form.Control type="text" ref={userEmailRef} required />
          </Form.Group>
          <Button type="submit">Add</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
