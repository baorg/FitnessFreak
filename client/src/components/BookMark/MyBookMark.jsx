import React, { useState, useEffect } from "react"

import CONFIG from '../../config';

import '../styles.css'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axiosCall from "../../ajaxRequest";
import { navigate } from "hookrouter";
import notLoggedIn from "../../notloggedin";
// import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
// import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';

const BookMark = function(props){
    const [marked, setMarked] = useState(false);
    useEffect(() => {
        axiosCall('get', `${CONFIG.API_DOMAIN}/question/is-bookmarked`, {quesId : props.quesId})
        .then((res) => {
          if(res.data.err)
            navigate("/")
          console.log("isMarked = ", res.data)
          setMarked(res.data.marked)
        })
      }, [ props.quesId ]);

    function saveBookMark(){
      axiosCall('post', `${CONFIG.API_DOMAIN}/question/save-bookmark`, { quesId: props.quesId })
        .then((res) => {
          if (res.data.err)
            navigate("/")
          console.log("saveBookMark = ", res.data)
          setMarked(res.data.marked);
        });
    }
    return(
      <div style={{marginLeft:"10px"}} >
  {marked ? <BookmarkIcon onClick = {props.user===undefined?notLoggedIn:saveBookMark} style={{fontSize:30}}/>  : <BookmarkBorderIcon onClick = {props.user===undefined?notLoggedIn:saveBookMark} style={{fontSize:30}}/>}
      </div>
  )
    
}

export default BookMark