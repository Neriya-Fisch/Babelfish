import React, { useState, useEffect, useRef } from "react";

const user = JSON.parse(localStorage.getItem("user"));

export default function Requests() {
  // get all friend requests from server, using GET request, "/requests" API endpoint
  // the server will return the friend requests in list of emails.
  // the list of emails will be stored in the state variable "friendRequests"
  const [friendRequests, setFriendRequests] = useState([]);

  // reject or accept friend request
  function answerFriendRequest(answer, friendRequestEmail) {
    //  use request/answer API endpoint to accept or reject friend request
    //  the server will return the updated friend requests list
    console.log("answer", answer);
    const userEmail = user.email;
    const fetchData = async () => {
       return await fetch("http://localhost:3001/contacts/requests/answer", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          friendRequestEmail: friendRequestEmail,
          answer: answer,
        }),
      }).catch((err) => console.log(err));
    };
    fetchData().then((data) =>{
      setFriendRequests(data[0].friendRequests);
    }
    )
  }

  // run get contacts function when the component is mounted
  useEffect(() => {
    // fetch the contacts from the server
    const userEmail = user.email;
    fetch("http://localhost:3001/contacts/requests/" + userEmail)
      .then((res) => res.json())
      .then((data) => {
        setFriendRequests(data[0].friendRequests);
      })
      .catch((err) => console.log(err));
  }, [friendRequests]);

  return (
    <div style={{ "background-color": "#ecf5f3" }}>
      <div>Hello {user.firstName} {user.lastName}!</div>
      {(friendRequests.length === 0) ? (
        <h1>You have no new Friend Requests</h1>
      ): null}
      <ul>
        {friendRequests.map((friendRequest, index) => (
          <li key={index}>
            {friendRequest}
            <button
              onClick={() => answerFriendRequest("accept", friendRequest)}
            >
              Accept
            </button>
            <button
              onClick={() => answerFriendRequest("reject", friendRequest)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
