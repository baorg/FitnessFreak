import React,{ useState, useEffect } from "react";
import { Home, Favorite, Search } from '@material-ui/icons';
import { Input, InputBase } from '@material-ui/core';
import styled from 'styled-components';
import { A, navigate } from 'hookrouter';

import {
  Navbar,
  Button,
} from "react-bootstrap";

import Searchdiv from "../../Searchdiv/searchdiv";
import Notification from "../../Notification/notification";
import CONFIG from '../../../config';
import AccountAvatar from './account';
import { fetchUserData } from '../../utils/fetch_user_data';


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

const MyNav = function({ }) {

  const [searchparam, setSearchParam] = useState("Search for User");
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      fetchUserData(setUser);
    }
    // return () => {
    //   cleanup
    // }
  });

  function handlechange(e) {
    let x=e.target.value;
    setSearchParam(x)
  }

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
        { user ?
          <>
            <Notification />
            <AccountAvatar user={user}/>
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