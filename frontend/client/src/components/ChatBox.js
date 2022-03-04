import React, {useRef, useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function ChatBox() {
  const idRef = useRef()
  const [phoneNumber, setPhoneNumber] = useState()

  function submitHandler(e){
    e.preventDefault();
    var { uname, pass } = document.forms[0]
    console.log(uname)

  }


  return (
  
      <Container>
        <Form>
          <Form.Group onSubmit={submitHandler} className="m-0">
            <Form.Label>Enter Your Full Name </Form.Label>
            <Form.Control name="full_name" type="text" ref={idRef} required />
            <Form.Label>Enter Your Phone Number </Form.Label>
            <Form.Control name ="phone_number" type="text" value={phoneNumber}
             ref={idRef} required />
          </Form.Group>
          <Button type="submit" className="mr-2" >Login!</Button> 
          <Button variant="secondary">Don't Have User yet? sigh up!</Button>  
        </Form>
        
        
        {/* <Form>
          <Form.Group>
            <Form.Label>Enter Your Phone Number</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Button type="submit">Login!</Button>   
        </Form> */}
      </Container>
    )
}
