import React,{useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  CloseButton
} from "react-bootstrap";
import './styles.css'
import {ENDPOINT} from '../utils'
import { A, navigate } from 'hookrouter';
import Searchdiv from "../Main/searchdiv";

const MyNav = function(props) {

  return (
    <div style={{position:"fixed",zIndex:"10",width:"100%",marginTop:"0px"}}>
    <Navbar  bg="light" expand="lg" >
      <A href="/"><Navbar.Brand >Fitness Freak</Navbar.Brand></A>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          {/* <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#" onClick={props.showuploadbox}>Upload Image</Nav.Link> */}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
          <Form inline >
            <div>
              {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
              <Searchdiv type="users" user={props.user} />
            </div>
          {/* <Button variant="outline-success" className="mx-1">
              Search
          </Button> */}
          </Form>
          {props.user ?
            <div style={{display:"flex",  alignItems:"center"}}>
              <Button variant="primary" className="mx-1" onClick={() => navigate("/profile/" + props.user._id)} >
              <AccountCircleIcon  />
                {/* <h4 style={{display:"inline-block"}}></h4> */}
                {props.user.username}
              </Button>
              <Button variant="danger" className="mx-1" onClick={() => navigate(`${ENDPOINT}/auth/logout`)} >
                Logout
              </Button>
            </div> :
            <Button variant="primary" className="mx-1">
              <a onClick={()=>navigate("/auth")} className="login-link">Login/Register</a>
            </Button>
          }
      </Navbar.Collapse>
    </Navbar>
    </div> );
};

export default MyNav;
