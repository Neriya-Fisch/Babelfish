import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function NewContacts({ closeModal }) {
    const userNameRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        var newUser = userNameRef.current.value
        // using the server to add the user to the contacts list
        fetch('http://localhost:3001/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newUser
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
    <Button type="submit">Add</Button>
    </Form>
    </Modal.Body>

    </>
    )
}
