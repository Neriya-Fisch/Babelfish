import React ,{useState, useEffect} from 'react'
import {Tab, Nav, Button, Modal, Form} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversation from './NewConversation'
import NewContacts from './NewContacts'


const CONVERSATIONS = 'conversation'
const CONTACTS = 'contacts'
const user = JSON.parse(localStorage.getItem("user"));
if(user)
  console.log(user)
// console.log(user.firstName, user.email)

export default function Dashboard({socket}) {
  
  
  const [activeKey, setActiveKey] = useState(CONVERSATIONS)
  const [modalOpen, setmodalOpen] = useState(false)
  const onConversations = activeKey === CONVERSATIONS
  
  // using the user name from the url to choose the user name and send it to server using the socket
  useEffect(() => {
    const user_name = window.location.pathname.split('/')[2]
    socket.emit('choose-user-name',user_name)
  }, [])

  function closeModal(){
    setmodalOpen(false)
  }

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className={'justify-content-center'}>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS}>conversation
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS}>contacts
            </Nav.Link>
          </Nav.Item>
        </Nav>
      <Tab.Content className="border-right overflow-auto flex-grow-1">
        <Tab.Pane eventKey={CONVERSATIONS}>
          <Conversations/>
        </Tab.Pane>
        <Tab.Pane eventKey={CONTACTS}>
          <Contacts/>
        </Tab.Pane>
      </Tab.Content>
      <div className="p-2 border-top border-right small">
      <h5>Hello {user.firstName + " " + user.lastName}</h5>
      </div>
       <Button className='rounded-0' onClick={() => setmodalOpen(true)}>
        New {onConversations ? 'Conversations': 'Contacts'}
      </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {
          onConversations ? 
          <NewConversation closeModal={closeModal}/> :
          <NewContacts closeModal={closeModal}/>
        }
      </Modal>
    
    </div>
  )
}
