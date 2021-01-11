import React,{useState} from "react";
import { Home, Favorite, Search } from '@material-ui/icons';
import { Input, InputBase } from '@material-ui/core';
import styled from 'styled-components';

import {
  Navbar,
  Button,
} from "react-bootstrap";

import { A, navigate } from 'hookrouter';
import Searchdiv from "../../Searchdiv/searchdiv";
import Notification from "../../Notification/notification";
import CONFIG from '../../../config';
import AccountAvatar from './account';

// Styled Components ================================================================

const StyledNavbar = styled(Navbar)`
  position:fixed;
  top: 0;
  z-index:10;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-content: center;
  justify-content: space-evenly;
`;

const StyledBrand = styled(StyledNavbar.Brand)`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=JetBrains+Mono:ital,wght@1,100&display=swap');
  font-family: 'Cinzel', serif;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.4em;
  font-style: italic;
  text-align: center;
`;


const InputDiv = styled.div`
  width: 20em;
  height: 2em;
  border-width: 1px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 5px;
  outline: none;
  background-color: #eeeeee;
  position: 'relative';
  border-radius: 10px;
  background-color: fade(white, 0.15);
  :hover{
    background-color: fade(white, 0.25),
  }

  margin-right: 5px;
  margin-left: 0px;
  padding-left: 10px;
  padding-right: 10px;
  
  .inpt{
    width: 100%;
  }
`;

const StyledIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-self: flex-end;
`;


const StyledHome = styled(Home)`
  cursor: pointer;
  margin-right: 1em;
`;

const Link = styled(A)`
  color: white;
  :hover{
    color: white;
    text-decoration: none;
  }
`

// ==================================================================================

const MyNav = function(props) {

  const [searchparam,setSearchParam]=useState("Search for User");
  function handlechange(e){
    let x=e.target.value;
    setSearchParam(x)
  }
  console.log(props.user);

  return (
    <StyledNavbar bg="light" expand="lg" >
      <StyledBrand href="/">Fitness Freak</StyledBrand>
      <InputDiv>
          <Search />
          <InputBase
            className="inpt"
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
      </InputDiv>
      <StyledIcons>
        <StyledHome onClick={()=>navigate('/')}></StyledHome>
        {props.user ?
          <>
            <Notification />
            <AccountAvatar user={props.user}/>
            </>
          :
          <Button variant="primary">
              <Link href="/auth" >Login/Register</Link>
          </Button>
        }
      </StyledIcons>
    </StyledNavbar>);
};

export default MyNav;



/* 
  <A href="/"><StyledNavbar.Brand >Fitness Freak</StyledNavbar.Brand></A>
      <StyledNavbar.Toggle aria-controls="basic-navbar-nav" />
      <StyledNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          
        </Nav>
        <div className="instasearchbox">
        <Form.Control as="select" style={{width:"105px",marginRight:"20px",fontSize:"12px",display:"inline-block"}} value={searchparam} onChange={handlechange}>
        <option style={styleClasses.option}>Search for User</option>
        <option style={styleClasses.option}>Search By Tag</option>
        </Form.Control>
          
              <Searchdiv type={searchparam} user={props.user} />
            </div>
          
          {props.user ?
          <div style={{marginRight:"20px"}}>
          <Notification />
          </div>
          :null}
          {props.user ?
            <div style={{display:"flex",  alignItems:"center"}}>
              <Button variant="primary" className="mx-1" onClick={() => navigate("/profile/" + props.user._id)} >
              <AccountCircleRounded />
                 <h4 style={{display:"inline-block"}}></h4>
                {props.user.username}
              </Button>
              <Button variant="danger" className="mx-1" onClick={() => navigate(`${CONFIG.CLIENT_DOMAIN}/auth/logout`)} >
                Logout
              </Button>
            </div> :
            <Button variant="primary" className="mx-1">
              <a onClick={()=>navigate("/auth")} className="login-link">Login/Register</a>
            </Button>
          }
      </StyledNavbar.Collapse> */