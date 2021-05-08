import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { A, navigate } from 'hookrouter';


// Material-UI components ------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import {
    Avatar, InputBase, useMediaQuery,
    AppBar, Toolbar, Typography,
    Button, IconButton, Menu, MenuItem,
} from '@material-ui/core'
import {
    Home as HomeIcon,
    Favorite as FavoriteIcon,
    Search as SearchIcon,
    Height as HeightIcon,
    Menu as MenuIcon
} from '@material-ui/icons';
// ----------------------------------------------------------------------


import CONFIG  from '../../../config';
import axiosCall from '../../../ajaxRequest';


// Styled Components ================================================================

const InputDiv = styled.div`
    width: min(auto, 100px);
    height: 2.5em;
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

    .dd{
        width: 300px;
        text-align: left;
        background-color: #c0c0c0;
        z-index: 100;
        overflow-y: scroll;
        max-height: 20em;
        position: absolute;
        top: 50px;
        padding: 0 10px 30px 10px;
        border-radius: 10px;
        

        ::-webkit-scrollbar-thumb {
            background-color: rgb(180, 180, 180);
            outline: 1px solid rgb(210, 230, 250);
            border-radius: 2px;
        }
        ::-webkit-scrollbar {
            width: 0.4em;
            border-radius: 100px;
        }
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px transparent;
            margin-left: -2em;
        }
    }
`;

// ==================================================================================

export default function Searchbar({}){
    const [searchparam, setSearchParam] = useState("");
    const [filterArr,setFilterArr]=useState([ ]);
        
    useEffect(() => {
        if (searchparam.length === 0) {
            document.querySelector('.dd').style.display = 'none';
        } else {
            document.querySelector('.dd').style.display = 'block';
        }
    }, [searchparam]);
    
        return (
            <InputDiv>
                <SearchIcon />
                <InputBase
                        className="inpt"
                        placeholder="Search for user"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={fil}
                        value={searchparam}
                        onBlur={f1}/>
                <div className="dd">
                    {filterArr.map((el, index) => 
                        <div className="dd1" key={index} style={{backgroundColor:"#c0c0c0",borderBottom:"1px solid gray",marginBottom:"2px",  alignItems:"center",display:"flex"}}>
                            <Avatar src={el.profile_image} style={{ marginRight:"10px" }}/>
                            <div style={{display:"inline-block"}}>
                                <a className="dd2" href="#" onClick={() => addTag(el)} style={{color:"black",fontSize:"20px"}}>{el.username}</a>
                                <p style={{fontSize:"14px",color:"gray"}}>{el.first_name} {el.last_name}</p>
                            </div>
                        </div>)}
                </div>
            </InputDiv>);

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
            document.querySelector('.dd').style.display = 'none';
        }
    
        function handlechange(e) {
            let x=e.target.value;
            setSearchParam(x)
        }
}