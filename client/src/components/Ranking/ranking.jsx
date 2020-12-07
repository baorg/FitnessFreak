import React, { useState,useRef,useEffect } from "react"
import MyNav from "../Navigation/navbar/navbar"
import SideNavPage from "../Navigation/SideNav/SideNav";
import '../styles.css'
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
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
      <SideNavPage />
      <div className="maindivofeverypage">
        <h2>Ranking of {props.typeofranking}</h2>
        <div>
            {rank.map((el,index)=>
            <div>
                <h2>{el.username}</h2>
                <h4>{el.score}</h4>
            </div>)}
        </div>
      </div>
    </>
  );
};

export default Ranking;
