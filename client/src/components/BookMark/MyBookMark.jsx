import React, { useState, useEffect } from "react"
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import styled from 'styled-components';

import CONFIG from '../../config';
import axiosCall from "../../ajaxRequest";
import { navigate } from "hookrouter";
import notLoggedIn from "../../notloggedin";
// import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
// import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';


// Styled Components ===========================================================================================================



// =============================================================================================================================





export default function Bookmark(props) {
  let { quesId } = props;
  const [ marked, setMarked ] = useState(null);
  const [bookmarkVis, setBookmarkVis] = useState(false);
  
  useEffect(() => {
    axiosCall('get', `${CONFIG.API_DOMAIN}/question/is-bookmarked?quesId=${quesId}`)
      .then((res) => {
        if (res.data.isAuthenticated) {
          setMarked(res.data.marked);
          setBookmarkVis(true);
        }
      });
  }, [ quesId ]);

  return (bookmarkVis && (marked? 
                      <BookmarkIcon
                        className="bookmark-icon icon"
                        onClick={saveBookMark}
                        color={marked === null ? 'disabled' : marked === true ? 'primary' : 'action'}
                      />: 
                      <BookmarkBorderIcon
                        className="bookmark-icon icon"
                        onClick={saveBookMark}
                        color={marked === null ? 'disabled' : marked === true ? 'primary' : 'action'}
                      />));

  function saveBookMark() {
    if (marked !== null && bookmarkVis) {
      setMarked(null);
      axiosCall('post', `${CONFIG.API_DOMAIN}/question/save-bookmark`, { quesId: quesId })
      .then((res) => {
        if (res.data.err)
          navigate("/")
        console.log("saveBookMark = ", res.data)
        setMarked(res.data.marked);
      });
    }
  }

}