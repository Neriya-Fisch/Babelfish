import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function NewContacts({ closeModal }) {
    const emailRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        // createContacts(emailRef.current.value)
        closeModal()
    }
    
    return (
    <>
    <Modal.Header closeButton>Add Contact</Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit}>
    <Form.Group>
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" ref={emailRef} required />
    </Form.Group>
    <Button type="submit">Add</Button>
    </Form>
    </Modal.Body>

    </>
    )
}
