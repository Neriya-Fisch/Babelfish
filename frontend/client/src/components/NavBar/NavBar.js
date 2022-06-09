import React, { Component, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import { Link, useNavigate,  } from "react-router-dom";
import logo from "../../Images/NavBarLogo.png";
import "./NavBar.css";


 class NavbarComp extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    function logOut(e){
      localStorage.removeItem("user");
      window.location = "/";
    }
    return (
      <div>
        <div>
          <Navbar expand="lg" style={{ "background-color": "#3bb19b" }}>
            <img src={logo} width={45} height={35}></img>
            <Navbar.Brand href="/" style={{ color: "white" }}>
              Babel Fish
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link style={{ color: "white" }} as={Link} to="/contacts">
                  Contacts
                </Nav.Link>
                <Nav.Link
                  style={{
                    color: "white",
                  }}
                  as={Link}
                  to="/about"
                >
                  About
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} as={Link} to="/friend_requests">
                  Friend Requests
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            {localStorage.getItem("user") ? (
              <NavDropdown
                title={user && user.firstName + " " + user.lastName}
                align="end"
                id="basic-nav-dropdown"
                flip
              >
                <NavDropdown.Item
                  style={{ color: "black" }}
                  as={Link}
                  to="/profile"
                >
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item style={{ color: "black" }} onClick={logOut}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Navbar>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <NavbarComp {...props} navigate={navigate} useEffect={useEffect} />;
}

export default WithNavigate;
