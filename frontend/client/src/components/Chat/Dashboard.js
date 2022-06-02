import React ,{useState, useEffect} from 'react'
import {Tab, Nav, Button, Modal, Form} from 'react-bootstrap'
import Requests from './Requests'
import Contacts from './Contacts'
import NewContacts from './NewContacts'


const CONVERSATIONS = 'conversation'
const CONTACTS = 'contacts'
const user = JSON.parse(localStorage.getItem("user"));

export default function Dashboard({socket}) {
  
  
  const [activeKey, setActiveKey] = useState(CONTACTS)
  const [modalOpen, setmodalOpen] = useState(false)
  const onConversations = activeKey === CONVERSATIONS
  
  // using the user name from the url to choose the user name and send it to server using the socket
  useEffect(() => {
    const user_email = user.email
    socket.emit('choose-user-name', user_email)
  }, [])

  function closeModal(){
    setmodalOpen(false)
  }

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className={'justify-content-center'}>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS}>Friend Requests
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS}>contacts
            </Nav.Link>
          </Nav.Item>
        </Nav>
      <Tab.Content className="border-right overflow-auto flex-grow-1">
        <Tab.Pane eventKey={CONVERSATIONS}>
          <Requests socket={socket}/>
        </Tab.Pane>
        <Tab.Pane eventKey={CONTACTS}>
          <Contacts/>
        </Tab.Pane>
      </Tab.Content>
      <div className="p-2 border-top border-right small">
      <h5>Hello {user.firstName + " " + user.lastName}</h5>
      </div>
      <Button className='rounded-0' onClick={() => setmodalOpen(true)}>
        New Friend Request
      </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {
          <NewContacts closeModal={closeModal}/>
        }
      </Modal>
    
    </div>
  )
}
