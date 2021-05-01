import React,{ useState, useEffect, useContext, createContext } from "react";
import styled from 'styled-components';
import { A, navigate } from 'hookrouter';

// Material-UI components ------------------------------------------


import Avatar from '@material-ui/core/Avatar'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import HeightIcon from '@material-ui/icons/Height';
import { responsive } from '../../utils/data.json';
// ----------------------------------------------------------------------


import Searchbar from "./searchbar";
import Notification from "../../Notification/notification";
import CONFIG from '../../../config';
import AccountAvatar from './account';
import { fetchUserData } from '../../utils/fetch_user_data';
import axiosCall from '../../../ajaxRequest'
import { UserContext } from '../../utils/UserContext';
import { NavContext } from '../../utils/NavContext';

// Styled Components ================================================================

const NavbarContainer = styled.div`
  flex-grow: 1;

  .nav-content{
    padding: 0.5em 0 0.5em 0;
  }

  .search-bar{
    max-width: 800px;
    width: auto;
    width: -moz-available;
    margin-left: auto;
    margin-right: auto;
    padding: 1px 10px 1px 10px;
    height: 3em;
  }

  @media (max-width: ${responsive.small}){
    font-size: 10px;
  }
`;

const StyledBrand = styled(A)`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=JetBrains+Mono:ital,wght@1,100&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
  
  font-family: Raleway, JetBrains Mono, monospace, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  text-decoration: none !important;
  color: #065BFB;
`;

const StyledIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-self: flex-end;
  margin-left: auto;

  .btn{
    background-color: blue;

    :hover{
      background-color: #9c9cff;
    }
  }
`;


const StyledHome = styled(HomeIcon)`
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



const MyNav = function () {
  const matches = useMediaQuery(`(max-width:${responsive.small})`);

  const [ searchparam, setSearchParam] = useState("");
  const [ filterArr, setFilterArr] = useState([]);
  // const [user, setUser] = useState(null);
  
  const [user, setUser] = useContext(UserContext);
  const [leftNavActive, setLeftNavActive] = useContext(NavContext).leftnav;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // fetchUserData(setUser);
  }, []);

  return (
    <NavbarContainer>
      <AppBar position="fixed" color="white">
          { matches ?
            <div className="nav-content">
              <Toolbar >
                <IconButton edge="start"  color="inherit" aria-label="menu" onClick={activateLeftNav}>
                  <MenuIcon />
                </IconButton>
                <StyledBrand href="/">Fitness Freak</StyledBrand>
                <StyledIcons >
                { user ?
                  <>
                    <Notification />
                    <AccountAvatar user={user}/>
                    </>
                  :
                  <Button  variant="outlined" color="primary" href="/auth" size={matches?"small":"medium"}>
                      Login/Register
                  </Button>
                }
              </StyledIcons>
              </Toolbar>
              <div className="search-bar"><Searchbar /></div>
            </div> :
            <Toolbar>
              <StyledBrand href="/">Fitness Freak</StyledBrand>
              <div className="search-bar"><Searchbar /></div>
              <StyledIcons >
                <StyledHome onClick={()=>navigate('/')}></StyledHome>
                { user ?
                  <>
                    <Notification />
                    <AccountAvatar user={user}/>
                    </>
                  :
                  <Button variant="outlined" color="primary" href="/auth">
                      Login/Register
                  </Button>
                }
              </StyledIcons> 
            </Toolbar>
          }
      </AppBar>
    </NavbarContainer>
  );

    

  function activateLeftNav(){
    setLeftNavActive(true);
  }

};

export default MyNav;