import React from "react";

export default function Register() {
  return (
    <div id="register">
      <form>
        <legend>Register</legend>

        {/* phone */}
        <label>Phone Number</label> <br />
        <input type="tel" required /> <br />

        {/* user name */}
        <label>User Name</label> <br />
        <input type="name" required />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
