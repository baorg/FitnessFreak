import React,{useState} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import './styles.css'
import {ENDPOINT} from '../utils'
import { A } from 'hookrouter';
import Searchdiv from "../Main/searchdiv";

const MyNav = function(props) {

  return (
    <div>
    <Navbar sticky="top" bg="light" expand="lg" >
      <A href="/"><Navbar.Brand >Ugly's</Navbar.Brand></A>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#" onClick={props.showuploadbox}>Upload Image</Nav.Link>
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
              <Searchdiv type="users" />
            </div>
          <Button variant="outline-success" className="mx-1">
              Search
          </Button>
          </Form>
          {props.user.userName ?
            <div style={{display:"flex",  alignItems:"center"}}>
            <Button variant="primary" className="mx-1" >
              <A href="/user-profile" className="login-link"><AccountCircleIcon  /></A>
              
            </Button>
            <h4 style={{display:"inline-block"}}>{props.user.userName}</h4>
            </div> :
            <Button variant="primary" className="mx-1">
              <a href={`${ENDPOINT}/auth/google`} className="login-link">Login</a>
            </Button>
            
          }

        
      </Navbar.Collapse>
     
    </Navbar>
    </div> 
    
  );
};

export default MyNav;
