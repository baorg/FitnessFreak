import React,{ useState, useEffect } from "react";
import { Home, Favorite, Search, Height } from '@material-ui/icons';
import { Input, InputBase, Avatar } from '@material-ui/core';
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
import axiosCall from '../../../ajaxRequest'

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



const MyNav = function ({ }) {

  const [searchparam, setSearchParam] = useState("");
  const [filterArr,setFilterArr]=useState([ ]);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchUserData(setUser);
  }, []);


  // console.log(props.user);
  return (
    <StyledNavbar bg="light" expand="lg" >
      <StyledBrand href="/">Fitness Freak</StyledBrand>
      <InputDiv>
          <Search />
          <InputBase
            className="inpt"
            placeholder="Search for user"
            inputProps={{ 'aria-label': 'search' }}
            onChange={fil}
            value={searchparam}
            onFocus={()=>{document.querySelector('.dd').style.display='block'}}
            onBlur={f1}
          />
          <br /><br /><br />
          <div className="dd" 
          style={{width:"250px",textAlign:"left",backgroundColor:"white",zIndex:"100",overflowY:"scroll",
          maxHeight:" 15em",
          position: "absolute",
          top:"50px"}}>
          {filterArr.map((el, index) => 
          <div className="dd1" key={index} style={{backgroundColor:"white",borderBottom:"1px solid gray",marginBottom:"2px",alignItems:"center",display:"flex"}}>
            <Avatar src={el.profile_image} style={{ marginRight:"10px" }}/>
            <div style={{display:"inline-block"}}>
              <a className="dd2" href="#" onClick={() => addTag(el)} style={{color:"black",fontSize:"20px"}}>{el.username}</a>
              <p style={{fontSize:"14px",color:"gray"}}>{el.first_name} {el.last_name}</p>
            </div>
          </div>)}
          </div>
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
  

    function fil(event){
      let x = event.target.value;
      setSearchParam(event.target.value);
      let url = `${CONFIG.API_DOMAIN}/Users/searchusers`;
      let obj={username:x}
      // console.log(obj)
      if(x==="")
          setFilterArr([]);
      else{
          axiosCall('POST', url, obj).then(res => {
              setFilterArr(res.data.users);
          });
      } 
  }


  function addTag(el){
    let url2 = `/profile/${el._id}`;
    navigate(url2);
  }
  function f1(event){
    // let w="";
    // document.addEventListener('click',function(e){
    //   console.log(e.target.className)
    //   w=e.target.id;
    // })
    // if(w === "dd" || w ==="dd1" || w ==="dd2"){
    //   console.log('hello1')
    // }
    // else{
    //   console.log('hello2')
    //   document.querySelector('.dd').style.display='none'
    // }
    setTimeout(function(){ document.querySelector('.dd').style.display='none' }, 500);
  
  }

  function handlechange(e) {
    let x=e.target.value;
    setSearchParam(x)
  }

};

export default MyNav;