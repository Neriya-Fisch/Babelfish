import React from 'react'
import Dashboard from './Dashboard'
import OpenConversation from './OpenConversation';
import {io} from 'socket.io-client'
import styles from "./styles.module.css";

// create a socket connection
const socket = io("https://babel-fish-1.herokuapp.com/");
socket.on('connect', (socket) => {
   console.log('socket connected', socket);
})

export default function Chat() {
  return (
    <div className='d-flex' style={{height: '569px', width: '1360px'}}>
      <Dashboard socket={socket}
        className='flex-grow-1'
      />
      <OpenConversation socket={socket}/>
      <div className={styles.main_container}>
  </div>


    </div>

    )
}


