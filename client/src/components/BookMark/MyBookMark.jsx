import React, { useState, useEffect, useContext } from "react"
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import styled from 'styled-components';

import CONFIG from '../../config';
import axiosCall from "../../ajaxRequest";
import { navigate } from "hookrouter";
import notLoggedIn from "../../notloggedin";
import { PopupAgreementContext } from "src/components/utils/PopupAgreementContext";


// Styled Components ===========================================================================================================



// =============================================================================================================================





export default function Bookmark(props) {
  let { quesId } = props;
  const [ marked, setMarked ] = useState(null);
  const [bookmarkVis, setBookmarkVis] = useState(false);
  const showPopUp = useContext(PopupAgreementContext);

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

  
async function addBookmark(){
  setMarked(null);
  let res = await axiosCall('post', `${CONFIG.API_DOMAIN}/question/save-bookmark`, { quesId: quesId });
  if (res.data.err)
    navigate("/")
  console.log("saveBookMark = ", res.data)
  setMarked(res.data.marked);
}
  
  function saveBookMark() {
    if (marked !== null && bookmarkVis) {
      showPopUp(
        {
          title: "Bookmark",
          content: marked? "Remove this from bookmarks":"Add this to your bookmarks"
        },
        "Agree",
        "Disagree",
        addBookmark,
        async () => { });
    }
  }

}