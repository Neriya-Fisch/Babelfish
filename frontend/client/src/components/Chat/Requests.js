import React, { useState, useEffect, useRef } from "react";

const user = JSON.parse(localStorage.getItem("user"));

export default function Requests() {
  // get all friend requests from server, using GET request, "/requests" API endpoint
  // the server will return the friend requests in list of emails.
  // the list of emails will be stored in the state variable "friend_requests"
  const [friend_requests, setFriendRequests] = useState([]);

  // reject or accept friend request
  function answerFriendRequest(answer, friend_request_email) {
    //  use request/answer API endpoint to accept or reject friend request
    //  the server will return the updated friend requests list
    console.log("answer", answer);
    const user_email = user.email;
    const fetchData = async () => {
       return await fetch("http://localhost:3001/contacts/requests/answer", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: user_email,
          friend_request_email: friend_request_email,
          answer: answer,
        }),
      }).catch((err) => console.log(err));
    };
    fetchData().then((data) =>{
      setFriendRequests(data[0].friend_requests);
    }
    )
  }

  // run get contacts function when the component is mounted
  useEffect(() => {
    // fetch the contacts from the server
    const user_email = user.email;
    fetch("http://localhost:3001/contacts/requests/" + user_email)
      .then((res) => res.json())
      .then((data) => {
        setFriendRequests(data[0].friend_requests);
      })
      .catch((err) => console.log(err));
  }, [friend_requests]);

  return (
    <div style={{ "background-color": "#ecf5f3" }}>
      <div>Hello!</div>
      <ul>
        {friend_requests.map((friend_request, index) => (
          <li key={index}>
            {friend_request}
            <button
              onClick={() => answerFriendRequest("accept", friend_request)}
            >
              Accept
            </button>
            <button
              onClick={() => answerFriendRequest("reject", friend_request)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
