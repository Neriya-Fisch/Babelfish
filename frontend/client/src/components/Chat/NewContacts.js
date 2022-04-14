import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const user = JSON.parse(localStorage.getItem("user"));

export default function NewContacts({ closeModal }) {
    const userNameRef = useRef()
    const userEmailRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        var reciver_user_name = userNameRef.current.value
        var reciver_user_email = userEmailRef.current.value
        // using the server to add the user to the contacts list of the user
        fetch('http://localhost:3001/contacts/' + user.email, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: reciver_user_email,
                name: reciver_user_name
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        closeModal()
    }
    
    return (
    <>
    <Modal.Header closeButton>Add Contact</Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit}>
    <Form.Group>
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" ref={userNameRef} required />
    </Form.Group>
    <Form.Group>
    <Form.Label>User Email</Form.Label>
    <Form.Control type="text" ref={userEmailRef} required />
    </Form.Group>
    <Button type="submit">Add</Button>
    </Form>
    </Modal.Body>
    </>
    )
}
