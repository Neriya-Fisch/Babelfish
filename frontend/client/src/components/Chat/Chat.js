import React from 'react'
import Dashboard from './Dashboard'
import OpenConversation from './OpenConversation';
import {io} from 'socket.io-client'
import styles from "./styles.module.css";


const socket = io("http://localhost:3002");

socket.on('connect', (socket) => {
   console.log('socket connected', socket);
})

	const user = localStorage.getItem("user");
	console.log(user)

	const handleLogout = () => {
		localStorage.removeItem("user");
		window.location.reload();
	};



export default function Chat() {
  return (
    <div className='d-flex' style={{height: '100vh'}}>
      <Dashboard socket={socket}
        className='flex-grow-1'
      />
      <OpenConversation socket={socket}/>

      <div className={styles.main_container}>
		<nav className={styles.navbar}>
      <h1>fakebook</h1>
      <button className={styles.white_btn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  </div>


    </div>

    )
}


