import React, {useState, useEffect} from 'react'

const user = JSON.parse(localStorage.getItem("user"));

export default function Requests() {
  
  // get all friend requests from server, using GET request, "/requests" API endpoint
  // the server will return the friend requests in list of emails.
  // the list of emails will be stored in the state variable "friend_requests"
  const [friend_requests, setFriendRequests] = useState([]);
  
  const getFriendRequests = () => {
    // fetch the contacts from the server
    const user_email = user.email
    fetch('http://localhost:3001/contacts/requests/' + user_email)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setFriendRequests(data[0].friend_requests);
    })
    .catch(err => console.log(err));
  };

  // reject or accept friend request
  function answerFriendRequest(answer, friend_request_email){
  //  use request/answer API endpoint to accept or reject friend request
  //  the server will return the updated friend requests list
    console.log("answer", answer);
    const user_email = user.email
    fetch('http://localhost:3001/contacts/requests/answer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_email: user_email,
        friend_request_email: friend_request_email,
        answer: answer
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setFriendRequests(data[0].friend_requests);
    })
    .catch(err => console.log(err));
  };


  // run get contacts function when the component is mounted
  useEffect(() => {
    getFriendRequests();
  }, []);

  return (
    <div>
      <ul>
        {friend_requests.map((friend_request, index) => (
          <li key={index}>
            {friend_request}
            <button onClick={() => answerFriendRequest("accept", friend_request)}>Accept</button>
            <button onClick={() => answerFriendRequest("reject", friend_request)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
    );
}

