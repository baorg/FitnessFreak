import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { ENDPOINT } from "../utils";
import '../styles.css'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axiosCall from "../../ajaxRequest";
import { navigate } from "hookrouter";
import notLoggedIn from "../../notloggedin";
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';

const BookMark = function(props){

    const [marked, setMarked] = useState(false)

    useEffect(() => {
        axiosCall('post', `${ENDPOINT}/Question/isBookMarked`, {quesId : props.quesId})
        .then((res) => {
          if(res.data.err)
            navigate("/")
          console.log("isMarked = ", res.data)
          setMarked(res.data.marked)
        })
      }, []);

    function saveBookMark(){

        axiosCall('post', `${ENDPOINT}/Question/saveBookMark`, {quesId : props.quesId})
        .then((res) => {
          if(res.data.err)
            navigate("/")
            console.log("saveBookMark = ", res.data)
          setMarked(!marked)
        })

    }
    return(
      <div style={{marginLeft:"10px"}} >
  {marked ? <BookmarkIcon onClick = {props.user===null?notLoggedIn:saveBookMark} style={{fontSize:30}}/>  : <BookmarkBorderIcon onClick = {props.user===null?notLoggedIn:saveBookMark} style={{fontSize:30}}/>}
      </div>
  )
    
}

export default BookMark