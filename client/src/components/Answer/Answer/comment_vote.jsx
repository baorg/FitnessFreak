import React,{useState,useEffect, useRef, useContext} from "react"
import styled from 'styled-components';


// Material-UI
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import { UserContext } from '../../utils/UserContext';

import axiosCall from "../../../ajaxRequest"
import notLoggedIn from "../../../notloggedin";
import CONFIG from '../../../config';

function UpvoteDownvote({ ansId, commentId, vote_count, voted }) {
    const [ upCount, setUpCount ] = useState(0);
    const [ downCount, setDownCount ] = useState(0);
    const [ up, setUp ]= useState(false);
    const [ down, setDown ]=useState(false);
    const [ clicked, setClicked ] = useState(false);
    const [ user, ] = useContext(UserContext);

    useEffect(initialize, [vote_count, voted ]);
    useEffect( handleValueChange, [ voted, ]);

  
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }} className="up-down">
      <span style={{ fontSize: 20 }}>{upCount}</span>
      <ThumbUpAltIcon
        disabled={clicked}
        onClick={!user ? notLoggedIn : up?unvote:upvote }
        color={clicked ? "disabled" : up ? "primary" : ""}
        fontSize="large"
      />

      <span style={{ fontSize: 20 }}>{downCount}</span>
      <ThumbDownAltIcon
        disabled={clicked}
        onClick={!user ? notLoggedIn : down?unvote:downvote}
        color={clicked ? "disabled" : down ? "secondary" : ""}
        fontSize="large"
      />
    </div>
  );

    function initialize(){
        console.log(commentId, 'Initializing...');
        handleValueChange(voted.value);
        handleVoteCountChange(vote_count);
    }

    function handleValueChange(value){
        console.log(value);
        switch(value){
            case -1:
                setUp(false);
                setDown(true);
                break;
            case 0:
                setUp(false);
                setDown(false);
                break;
            case +1:
                setUp(true);
                setDown(false);
                break;
        }
    }
    function handleVoteCountChange(vote_count){
        console.log(vote_count);
        setUpCount(vote_count.upvote);
        setDownCount(vote_count.downvote);
    }
    function handleVoteRequest(url){
        if(!clicked){
            setClicked(true);
            axiosCall('get', url).then(({data}) => {
                console.log(data);
                if (data.success) {
                    console.log('Success.');
                    handleVoteCountChange(data.vote_count);
                    handleValueChange(data.vote.value);
                } else if(data.isAuthenticated===false) {
                    notLoggedIn();
                }
                setClicked(false);
            });
        }
    }

    function upvote(){
        handleVoteRequest(`${CONFIG.API_DOMAIN}/answer/upvote-comment?answer_id=${ansId}&comment_id=${commentId}`);
    }
    function downvote(){
        handleVoteRequest(`${CONFIG.API_DOMAIN}/answer/downvote-comment?answer_id=${ansId}&comment_id=${commentId}`);
    }
    function unvote(){
        handleVoteRequest(`${CONFIG.API_DOMAIN}/answer/unvote-comment?answer_id=${ansId}&comment_id=${commentId}`);
    }
}


export default UpvoteDownvote;