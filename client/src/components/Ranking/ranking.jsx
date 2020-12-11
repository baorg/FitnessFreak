import React, { useState,useRef,useEffect } from "react"
import MyNav from "../Navigation/navbar/navbar"
import SideNavPage from "../Navigation/SideNav/SideNav";
import '../styles.css'
import { ENDPOINT } from "../utils";
import axios from "axios";
import { A,navigate } from 'hookrouter';
import axiosCall from "../../ajaxRequest";

const Ranking = function(props) {

  const [rank, setRank] = useState([]);

  useEffect(() => {
    //axios call
    let url=`${ENDPOINT}/Rank/ByCategory/`;
    console.log("Calling resOfTypeOfpage");
    console.log("typeogPage = ", props.typeofranking)
    if(props.typeofranking==="Total")
    url=url+"totalScore";
    else if(props.typeofranking==="Followers")
    url=url+"followers";
    else
    url=url+props.typeofranking;

    axiosCall('GET', url)
      .then((res) => {
        console.log("resOfTypeOfpage = ", res.data)
        // if(res.data.isAuthenticated===false){
        //     navigate(`${ENDPOINT}`)
        // }
        // else{

        // }
        setRank(res.data.data);
    })

  }, []);

  return (
    <>
      <MyNav user={props.user} />
      <SideNavPage user={props.user}/>
      <div className="maindivofeverypage">
        <h2>Ranking of {props.typeofranking}</h2>
        <br /><br /><br />
        <div>
            {rank.map((el,index)=>
              <div style={{textAlign:"left",borderBottom:"2px solid #B8B8B8", padding:"5px"}} className="shiny">
              <p style={{display:"inline-block",fontSize:"20px" ,paddingRight:"10px"}}>#{index+1}</p>
              <img src={el.profile_image} style={{height:"50px",borderRadius:"1000px"}} />
              <A href={`/profile/${el._id}`} style={{fontSize:"20px",padding:"10px",color:"black"}}>{el.username}</A>
              <p style={{display:"inline-block",fontSize:"20px"}}>: {el.score}</p>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Ranking;
