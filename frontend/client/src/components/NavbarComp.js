import React, { Component, useEffect } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { Link, useNavigate,  } from "react-router-dom";


 class NavbarComp extends Component {
  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    function logOut(e){
      localStorage.removeItem("user");
      window.location.reload(false);
    }
    return (
      <div>
        <div>
          <Navbar bg="dark" variant={"dark"} expand="lg">
            <Navbar.Brand href="/">BabelFish</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/contacts">
                  Contacts
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
              {localStorage.getItem("user") ?
            <Nav>
              <NavDropdown title={user && user.firstName + " " + user.lastName}>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            :null
    }
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
