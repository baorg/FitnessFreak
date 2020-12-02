import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { ENDPOINT } from "../utils";
import '../styles.css'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axiosCall from "../../ajaxRequest";
import { navigate } from "hookrouter";

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

        axiosCall('post', `${ENDPOINT}/Question/saveBookMark`, {quesId : props.quesId, username : props.username})
        .then((res) => {
          if(res.data.err)
            navigate("/")
            console.log("saveBookMark = ", res.data)
          setMarked(!marked)
        })

    }
    return(
  <button onClick = {saveBookMark}>{marked ? <BookmarkIcon/>  : <BookmarkBorderIcon />}</button>
  )
    
}

export default BookMark