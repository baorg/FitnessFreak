import { useState } from 'react';
import styled from 'styled-components';
import { A, navigate } from 'hookrouter';


// Material-UI components ------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar'
import InputBase from '@material-ui/core/InputBase';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

// ----------------------------------------------------------------------


import CONFIG  from '../../../config';
import axiosCall from '../../../ajaxRequest';


// Styled Components ================================================================

const InputDiv = styled.div`
  width: min(auto, 100px);
  height: 2em;
  border-width: 1px;
  display: flex;
  align-items: center;
  outline: none;
  background-color: #eeeeee;
  border-radius: 10px;
  background-color: fade(white, 0.15);
  :hover{
    background-color: fade(white, 0.25),
  }


  margin: 0.5 auto 0.5 auto;
  padding-left: 10px;
  padding-right: 10px;
  
  .inpt{
    width: 100%;
  }
`;

// ==================================================================================

export default function Searchbar({}){
    const [searchparam, setSearchParam] = useState("");
    const [filterArr,setFilterArr]=useState([ ]);
    
    
    return (
        <InputDiv>
            <SearchIcon />
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
            <div className="dd1" key={index} style={{backgroundColor:"white",borderBottom:"1px solid gray",marginBottom:"2px",  alignItems:"center",display:"flex"}}>
              <Avatar src={el.profile_image} style={{ marginRight:"10px" }}/>
              <div style={{display:"inline-block"}}>
                <a className="dd2" href="#" onClick={() => addTag(el)} style={{color:"black",fontSize:"20px"}}>{el.username}</a>
                <p style={{fontSize:"14px",color:"gray"}}>{el.first_name} {el.last_name}</p>
              </div>
            </div>)}
            </div>
          </InputDiv>
    );

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
}