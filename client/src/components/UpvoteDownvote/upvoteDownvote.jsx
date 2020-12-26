import React,{useState,useEffect, useRef} from "react"
import axiosCall from "../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../notloggedin";
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import CONFIG from '../../config';



// Styled Components ========================================================

let ThumbsIcon = styled.img`
  max-width: 30px;
  max-height: 30px;
  cursor: pointer;
`;

// ==========================================================================


function UpvoteDownvote(props) {
  const [up,setUp]= useState(false);
  const [down,setDown]=useState(false);
  // const upRef=useRef(null);
  // const downRef=useRef(null);
  const totalUpRef=useRef(null);
  const totalDownRef = useRef(null);
  useEffect(() => {
    axiosCall('post', `${CONFIG.API_DOMAIN}/Question/votes/byUser`, {quesId : props.quesId, isQues : props.isQues})
      .then(res => {
        console.log("upvotedata = " ,res.data);
        if(res.data.upvote)
            setUp(true);
        else
        if(res.data.downvote)
            setDown(true);
      });
  }, []);
  
  return (
    <div style={{display:"flex",alignItems:"center",marginTop:"20px"}}>
      
      <span ref={totalUpRef} style={{ fontSize: 20 }}>{props.totalCount ? props.totalCount.up : null}</span>
      <ThumbsIcon
        src={up ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ3NS4wOTkgNDc1LjA5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHNjcmlwdD4KICAgICAgICAvLyBDYXRjaCBlcnJvcnMgaWYgc2lnbmFsIGlzIGFscmVhZHkgc2V0IGJ5IHVzZXIgYWdlbnQgb3Igb3RoZXIgZXh0ZW5zaW9uCiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ2dsb2JhbFByaXZhY3lDb250cm9sJywgewogICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLAogICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZQogICAgICAgICAgICB9KQogICAgICAgICAgICAvLyBSZW1vdmUgc2NyaXB0IHRhZyBhZnRlciBleGVjdXRpb24KICAgICAgICAgICAgZG9jdW1lbnQuY3VycmVudFNjcmlwdC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpCiAgICAgICAgfSBjYXRjaCAoZSkge308L3NjcmlwdD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Ik00NDIuODI5LDI2NS41MzJjOS4zMjgtMTQuMDg5LDEzLjk4Ni0yOS41OTgsMTMuOTg2LTQ2LjUzOGMwLTE5LjYwNy03LjIyNS0zNi42MzctMjEuNjg3LTUxLjExNyAgIGMtMTQuNDY5LTE0LjQ2NS0zMS42MDEtMjEuNjk2LTUxLjM5NC0yMS42OTZoLTUwLjI1MWM5LjEzNC0xOC44NDIsMTMuNzA5LTM3LjExNywxMy43MDktNTQuODE2YzAtMjIuMjcxLTMuMzQtMzkuOTcxLTkuOTk2LTUzLjEwNSAgIGMtNi42NjMtMTMuMTM4LTE2LjM3Mi0yMi43OTUtMjkuMTI2LTI4Ljk4NEMyOTUuMzEzLDMuMDksMjgwLjk0NywwLDI2NC45NTksMGMtOS43MTIsMC0xOC4yNzQsMy41MjEtMjUuNjk3LDEwLjU2NiAgIGMtOC4xODMsNy45OTMtMTQuMDg0LDE4LjI3NC0xNy42OTksMzAuODM3Yy0zLjYxNywxMi41NTktNi41MjEsMjQuNi04LjcwOCwzNi4xMTZjLTIuMTg3LDExLjUxNS01LjU2OSwxOS42NTItMTAuMTM1LDI0LjQxICAgYy05LjMyOSwxMC4wODgtMTkuNTExLDIyLjI3My0zMC41NTEsMzYuNTQ3Yy0xOS4yMjQsMjQuOTMyLTMyLjI2NCwzOS42ODUtMzkuMTEzLDQ0LjI1NUg1NC44MjggICBjLTEwLjA4OCwwLTE4LjcwMiwzLjU3NC0yNS44NCwxMC43MDZjLTcuMTM1LDcuMTM5LTEwLjcwNSwxNS43NTItMTAuNzA1LDI1Ljg0MXYxODIuNzIzYzAsMTAuMDg5LDMuNTY2LDE4LjY5OSwxMC43MDUsMjUuODM4ICAgYzcuMTQyLDcuMTM5LDE1Ljc1MiwxMC43MTEsMjUuODQsMTAuNzExaDgyLjIyMWM0LjE4OCwwLDE3LjMxOSwzLjgwNiwzOS4zOTksMTEuNDJjMjMuNDEzLDguMTg2LDQ0LjAxNywxNC40MTgsNjEuODEyLDE4LjcwMiAgIGMxNy43OTcsNC4yODQsMzUuODMyLDYuNDI3LDU0LjEwNiw2LjQyN2gyNi41NDVoMTAuMjg0YzI2LjgzNiwwLDQ4LjQzOC03LjY2Niw2NC44MDktMjIuOTkgICBjMTYuMzY1LTE1LjMyNCwyNC40NTgtMzYuMjEzLDI0LjI3LTYyLjY3YzExLjQyLTE0LjY1NywxNy4xMjktMzEuNTk3LDE3LjEyOS01MC44MTljMC00LjE4NS0wLjI4MS04LjI3Ny0wLjg1NS0xMi4yNzggICBjNy4yMy0xMi43NDgsMTAuODU0LTI2LjQ1MywxMC44NTQtNDEuMTFDNDQ1LjM5OSwyNzguMzc5LDQ0NC41NDQsMjcxLjgwOSw0NDIuODI5LDI2NS41MzJ6IE04NS45NDksMzk2LjU4ICAgYy0zLjYxNiwzLjYxNC03Ljg5OCw1LjQyOC0xMi44NDcsNS40MjhjLTQuOTUsMC05LjIzMy0xLjgxMy0xMi44NS01LjQyOGMtMy42MTUtMy42MTMtNS40MjQtNy44OTctNS40MjQtMTIuODUgICBjMC00Ljk0OCwxLjgwNS05LjIyOSw1LjQyNC0xMi44NDdjMy42MjEtMy42MTcsNy45LTUuNDI1LDEyLjg1LTUuNDI1YzQuOTQ5LDAsOS4yMzEsMS44MDgsMTIuODQ3LDUuNDI1ICAgYzMuNjE3LDMuNjE3LDUuNDI2LDcuODk4LDUuNDI2LDEyLjg0N0M5MS4zNzUsMzg4LjY4Myw4OS41NjYsMzkyLjk2Nyw4NS45NDksMzk2LjU4eiBNNDE0LjE0NSwyNDIuNDE5ICAgYy00LjA5Myw4Ljc1NC05LjE4NiwxMy4yMjctMTUuMjc2LDEzLjQxNWMyLjg1NCwzLjIzNyw1LjIzNSw3Ljc2Miw3LjEzOSwxMy41NjJjMS45MDIsNS44MDcsMi44NDcsMTEuMDg3LDIuODQ3LDE1Ljg0OCAgIGMwLDEzLjEyNy01LjAzNywyNC40NTUtMTUuMTI2LDMzLjk2OWMzLjQzLDYuMDg4LDUuMTQxLDEyLjY1OCw1LjE0MSwxOS42OTdjMCw3LjA0My0xLjY2MywxNC4wMzgtNC45OTYsMjAuOTg0ICAgYy0zLjMyNyw2Ljk0LTcuODUxLDExLjkzOC0xMy41NTksMTQuOTgyYzAuOTUxLDUuNzA5LDEuNDIzLDExLjA0LDEuNDIzLDE1Ljk4OGMwLDMxLjc4NS0xOC4yNzQsNDcuNjc4LTU0LjgyMyw0Ny42NzhoLTM0LjUzNiAgIGMtMjQuOTQsMC01Ny40ODMtNi45NDMtOTcuNjQ4LTIwLjg0MWMtMC45NTMtMC4zOC0zLjcwOS0xLjM4My04LjI4LTIuOTk4cy03Ljk0OC0yLjgwNi0xMC4xMzgtMy41NjUgICBjLTIuMTktMC43NjctNS41MTgtMS44NjEtOS45OTQtMy4yODVjLTQuNDc1LTEuNDMxLTguMDg3LTIuNDc5LTEwLjg0OS0zLjE0MmMtMi43NTgtMC42NjQtNS45MDEtMS4yODMtOS40MTktMS44NTUgICBjLTMuNTItMC41NzEtNi41MTktMC44NTUtOC45OTMtMC44NTVoLTkuMTM2VjIxOS4yODVoOS4xMzZjMy4wNDUsMCw2LjQyMy0wLjg1OSwxMC4xMzUtMi41NjhjMy43MTEtMS43MTQsNy41Mi00LjI4MywxMS40MjEtNy43MSAgIGMzLjkwMy0zLjQyNyw3LjU2NC02LjgwNSwxMC45OTItMTAuMTM4YzMuNDI3LTMuMzMsNy4yMzMtNy41MTcsMTEuNDIyLTEyLjU1OWM0LjE4Ny01LjA0Niw3LjQ3LTkuMDg5LDkuODUxLTEyLjEzNSAgIGMyLjM3OC0zLjA0NSw1LjM3NS02Ljk0OSw4Ljk5Mi0xMS43MDdjMy42MTUtNC43NTcsNS44MDYtNy42MTMsNi41NjctOC41NjZjMTAuNDY3LTEyLjk0MSwxNy43OTUtMjEuNjAxLDIxLjk4Mi0yNS45ODEgICBjNy44MDQtOC4xODIsMTMuNDY2LTE4LjYwMywxNi45ODctMzEuMjYxYzMuNTI1LTEyLjY2LDYuNDI3LTI0LjYwNCw4LjcwMy0zNS44MzJjMi4yODItMTEuMjI5LDUuOTAzLTE5LjMyMSwxMC44NTgtMjQuMjcgICBjMTguMjY4LDAsMzAuNDUzLDQuNDcxLDM2LjU0MiwxMy40MThjNi4wODgsOC45NDUsOS4xMzQsMjIuNzQ2LDkuMTM0LDQxLjM5OWMwLDExLjIyOS00LjU3MiwyNi41MDMtMTMuNzEsNDUuODIxICAgYy05LjEzNCwxOS4zMi0xMy42OTgsMzQuNS0xMy42OTgsNDUuNTM5aDEwMC40OTVjOS41MjcsMCwxNy45OTMsMy42NjIsMjUuNDEzLDEwLjk5NGM3LjQyNiw3LjMyNywxMS4xNDMsMTUuODQzLDExLjE0MywyNS41NTMgICBDNDIwLjI4NCwyMjUuOTQzLDQxOC4yMzcsMjMzLjY1Myw0MTQuMTQ1LDI0Mi40MTl6IiBmaWxsPSIjMDBmZjFhIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
          : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3NS4wOTlweCIgaGVpZ2h0PSI0NzUuMDk5cHgiIHZpZXdCb3g9IjAgMCA0NzUuMDk5IDQ3NS4wOTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3NS4wOTkgNDc1LjA5OTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQ0Mi44MjksMjY1LjUzMmM5LjMyOC0xNC4wODksMTMuOTg2LTI5LjU5OCwxMy45ODYtNDYuNTM4YzAtMTkuNjA3LTcuMjI1LTM2LjYzNy0yMS42ODctNTEuMTE3DQoJCWMtMTQuNDY5LTE0LjQ2NS0zMS42MDEtMjEuNjk2LTUxLjM5NC0yMS42OTZoLTUwLjI1MWM5LjEzNC0xOC44NDIsMTMuNzA5LTM3LjExNywxMy43MDktNTQuODE2YzAtMjIuMjcxLTMuMzQtMzkuOTcxLTkuOTk2LTUzLjEwNQ0KCQljLTYuNjYzLTEzLjEzOC0xNi4zNzItMjIuNzk1LTI5LjEyNi0yOC45ODRDMjk1LjMxMywzLjA5LDI4MC45NDcsMCwyNjQuOTU5LDBjLTkuNzEyLDAtMTguMjc0LDMuNTIxLTI1LjY5NywxMC41NjYNCgkJYy04LjE4Myw3Ljk5My0xNC4wODQsMTguMjc0LTE3LjY5OSwzMC44MzdjLTMuNjE3LDEyLjU1OS02LjUyMSwyNC42LTguNzA4LDM2LjExNmMtMi4xODcsMTEuNTE1LTUuNTY5LDE5LjY1Mi0xMC4xMzUsMjQuNDENCgkJYy05LjMyOSwxMC4wODgtMTkuNTExLDIyLjI3My0zMC41NTEsMzYuNTQ3Yy0xOS4yMjQsMjQuOTMyLTMyLjI2NCwzOS42ODUtMzkuMTEzLDQ0LjI1NUg1NC44MjgNCgkJYy0xMC4wODgsMC0xOC43MDIsMy41NzQtMjUuODQsMTAuNzA2Yy03LjEzNSw3LjEzOS0xMC43MDUsMTUuNzUyLTEwLjcwNSwyNS44NDF2MTgyLjcyM2MwLDEwLjA4OSwzLjU2NiwxOC42OTksMTAuNzA1LDI1LjgzOA0KCQljNy4xNDIsNy4xMzksMTUuNzUyLDEwLjcxMSwyNS44NCwxMC43MTFoODIuMjIxYzQuMTg4LDAsMTcuMzE5LDMuODA2LDM5LjM5OSwxMS40MmMyMy40MTMsOC4xODYsNDQuMDE3LDE0LjQxOCw2MS44MTIsMTguNzAyDQoJCWMxNy43OTcsNC4yODQsMzUuODMyLDYuNDI3LDU0LjEwNiw2LjQyN2gyNi41NDVoMTAuMjg0YzI2LjgzNiwwLDQ4LjQzOC03LjY2Niw2NC44MDktMjIuOTkNCgkJYzE2LjM2NS0xNS4zMjQsMjQuNDU4LTM2LjIxMywyNC4yNy02Mi42N2MxMS40Mi0xNC42NTcsMTcuMTI5LTMxLjU5NywxNy4xMjktNTAuODE5YzAtNC4xODUtMC4yODEtOC4yNzctMC44NTUtMTIuMjc4DQoJCWM3LjIzLTEyLjc0OCwxMC44NTQtMjYuNDUzLDEwLjg1NC00MS4xMUM0NDUuMzk5LDI3OC4zNzksNDQ0LjU0NCwyNzEuODA5LDQ0Mi44MjksMjY1LjUzMnogTTg1Ljk0OSwzOTYuNTgNCgkJYy0zLjYxNiwzLjYxNC03Ljg5OCw1LjQyOC0xMi44NDcsNS40MjhjLTQuOTUsMC05LjIzMy0xLjgxMy0xMi44NS01LjQyOGMtMy42MTUtMy42MTMtNS40MjQtNy44OTctNS40MjQtMTIuODUNCgkJYzAtNC45NDgsMS44MDUtOS4yMjksNS40MjQtMTIuODQ3YzMuNjIxLTMuNjE3LDcuOS01LjQyNSwxMi44NS01LjQyNWM0Ljk0OSwwLDkuMjMxLDEuODA4LDEyLjg0Nyw1LjQyNQ0KCQljMy42MTcsMy42MTcsNS40MjYsNy44OTgsNS40MjYsMTIuODQ3QzkxLjM3NSwzODguNjgzLDg5LjU2NiwzOTIuOTY3LDg1Ljk0OSwzOTYuNTh6IE00MTQuMTQ1LDI0Mi40MTkNCgkJYy00LjA5Myw4Ljc1NC05LjE4NiwxMy4yMjctMTUuMjc2LDEzLjQxNWMyLjg1NCwzLjIzNyw1LjIzNSw3Ljc2Miw3LjEzOSwxMy41NjJjMS45MDIsNS44MDcsMi44NDcsMTEuMDg3LDIuODQ3LDE1Ljg0OA0KCQljMCwxMy4xMjctNS4wMzcsMjQuNDU1LTE1LjEyNiwzMy45NjljMy40Myw2LjA4OCw1LjE0MSwxMi42NTgsNS4xNDEsMTkuNjk3YzAsNy4wNDMtMS42NjMsMTQuMDM4LTQuOTk2LDIwLjk4NA0KCQljLTMuMzI3LDYuOTQtNy44NTEsMTEuOTM4LTEzLjU1OSwxNC45ODJjMC45NTEsNS43MDksMS40MjMsMTEuMDQsMS40MjMsMTUuOTg4YzAsMzEuNzg1LTE4LjI3NCw0Ny42NzgtNTQuODIzLDQ3LjY3OGgtMzQuNTM2DQoJCWMtMjQuOTQsMC01Ny40ODMtNi45NDMtOTcuNjQ4LTIwLjg0MWMtMC45NTMtMC4zOC0zLjcwOS0xLjM4My04LjI4LTIuOTk4cy03Ljk0OC0yLjgwNi0xMC4xMzgtMy41NjUNCgkJYy0yLjE5LTAuNzY3LTUuNTE4LTEuODYxLTkuOTk0LTMuMjg1Yy00LjQ3NS0xLjQzMS04LjA4Ny0yLjQ3OS0xMC44NDktMy4xNDJjLTIuNzU4LTAuNjY0LTUuOTAxLTEuMjgzLTkuNDE5LTEuODU1DQoJCWMtMy41Mi0wLjU3MS02LjUxOS0wLjg1NS04Ljk5My0wLjg1NWgtOS4xMzZWMjE5LjI4NWg5LjEzNmMzLjA0NSwwLDYuNDIzLTAuODU5LDEwLjEzNS0yLjU2OGMzLjcxMS0xLjcxNCw3LjUyLTQuMjgzLDExLjQyMS03LjcxDQoJCWMzLjkwMy0zLjQyNyw3LjU2NC02LjgwNSwxMC45OTItMTAuMTM4YzMuNDI3LTMuMzMsNy4yMzMtNy41MTcsMTEuNDIyLTEyLjU1OWM0LjE4Ny01LjA0Niw3LjQ3LTkuMDg5LDkuODUxLTEyLjEzNQ0KCQljMi4zNzgtMy4wNDUsNS4zNzUtNi45NDksOC45OTItMTEuNzA3YzMuNjE1LTQuNzU3LDUuODA2LTcuNjEzLDYuNTY3LTguNTY2YzEwLjQ2Ny0xMi45NDEsMTcuNzk1LTIxLjYwMSwyMS45ODItMjUuOTgxDQoJCWM3LjgwNC04LjE4MiwxMy40NjYtMTguNjAzLDE2Ljk4Ny0zMS4yNjFjMy41MjUtMTIuNjYsNi40MjctMjQuNjA0LDguNzAzLTM1LjgzMmMyLjI4Mi0xMS4yMjksNS45MDMtMTkuMzIxLDEwLjg1OC0yNC4yNw0KCQljMTguMjY4LDAsMzAuNDUzLDQuNDcxLDM2LjU0MiwxMy40MThjNi4wODgsOC45NDUsOS4xMzQsMjIuNzQ2LDkuMTM0LDQxLjM5OWMwLDExLjIyOS00LjU3MiwyNi41MDMtMTMuNzEsNDUuODIxDQoJCWMtOS4xMzQsMTkuMzItMTMuNjk4LDM0LjUtMTMuNjk4LDQ1LjUzOWgxMDAuNDk1YzkuNTI3LDAsMTcuOTkzLDMuNjYyLDI1LjQxMywxMC45OTRjNy40MjYsNy4zMjcsMTEuMTQzLDE1Ljg0MywxMS4xNDMsMjUuNTUzDQoJCUM0MjAuMjg0LDIyNS45NDMsNDE4LjIzNywyMzMuNjUzLDQxNC4xNDUsMjQyLjQxOXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
        }
        up={up}
        onClick={props.user === undefined ? notLoggedIn : upvoted} />
      
      <span ref={totalDownRef} style={{ fontSize: 20 }}>{props.totalCount ? props.totalCount.down : null}</span>
      <ThumbsIcon
        src={down ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ3NS4wOTkgNDc1LjA5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwxLjIyNDY0Njc5OTE0NzM1MzJlLTE2LDEuMjI0NjQ2Nzk5MTQ3MzUzMmUtMTYsLTEsNS42ODQzNDE4ODYwODA4MDJlLTE0LDQ3NS4wOTkwMjk1NDEwMTU1NykiPjxzY3JpcHQ+CiAgICAgICAgLy8gQ2F0Y2ggZXJyb3JzIGlmIHNpZ25hbCBpcyBhbHJlYWR5IHNldCBieSB1c2VyIGFnZW50IG9yIG90aGVyIGV4dGVuc2lvbgogICAgICAgIHRyeSB7CiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdnbG9iYWxQcml2YWN5Q29udHJvbCcsIHsKICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZSwKICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUKICAgICAgICAgICAgfSkKICAgICAgICAgICAgLy8gUmVtb3ZlIHNjcmlwdCB0YWcgYWZ0ZXIgZXhlY3V0aW9uCiAgICAgICAgICAgIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb2N1bWVudC5jdXJyZW50U2NyaXB0KQogICAgICAgIH0gY2F0Y2ggKGUpIHt9PC9zY3JpcHQ+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNNDQyLjgyOSwyNjUuNTMyYzkuMzI4LTE0LjA4OSwxMy45ODYtMjkuNTk4LDEzLjk4Ni00Ni41MzhjMC0xOS42MDctNy4yMjUtMzYuNjM3LTIxLjY4Ny01MS4xMTcgICBjLTE0LjQ2OS0xNC40NjUtMzEuNjAxLTIxLjY5Ni01MS4zOTQtMjEuNjk2aC01MC4yNTFjOS4xMzQtMTguODQyLDEzLjcwOS0zNy4xMTcsMTMuNzA5LTU0LjgxNmMwLTIyLjI3MS0zLjM0LTM5Ljk3MS05Ljk5Ni01My4xMDUgICBjLTYuNjYzLTEzLjEzOC0xNi4zNzItMjIuNzk1LTI5LjEyNi0yOC45ODRDMjk1LjMxMywzLjA5LDI4MC45NDcsMCwyNjQuOTU5LDBjLTkuNzEyLDAtMTguMjc0LDMuNTIxLTI1LjY5NywxMC41NjYgICBjLTguMTgzLDcuOTkzLTE0LjA4NCwxOC4yNzQtMTcuNjk5LDMwLjgzN2MtMy42MTcsMTIuNTU5LTYuNTIxLDI0LjYtOC43MDgsMzYuMTE2Yy0yLjE4NywxMS41MTUtNS41NjksMTkuNjUyLTEwLjEzNSwyNC40MSAgIGMtOS4zMjksMTAuMDg4LTE5LjUxMSwyMi4yNzMtMzAuNTUxLDM2LjU0N2MtMTkuMjI0LDI0LjkzMi0zMi4yNjQsMzkuNjg1LTM5LjExMyw0NC4yNTVINTQuODI4ICAgYy0xMC4wODgsMC0xOC43MDIsMy41NzQtMjUuODQsMTAuNzA2Yy03LjEzNSw3LjEzOS0xMC43MDUsMTUuNzUyLTEwLjcwNSwyNS44NDF2MTgyLjcyM2MwLDEwLjA4OSwzLjU2NiwxOC42OTksMTAuNzA1LDI1LjgzOCAgIGM3LjE0Miw3LjEzOSwxNS43NTIsMTAuNzExLDI1Ljg0LDEwLjcxMWg4Mi4yMjFjNC4xODgsMCwxNy4zMTksMy44MDYsMzkuMzk5LDExLjQyYzIzLjQxMyw4LjE4Niw0NC4wMTcsMTQuNDE4LDYxLjgxMiwxOC43MDIgICBjMTcuNzk3LDQuMjg0LDM1LjgzMiw2LjQyNyw1NC4xMDYsNi40MjdoMjYuNTQ1aDEwLjI4NGMyNi44MzYsMCw0OC40MzgtNy42NjYsNjQuODA5LTIyLjk5ICAgYzE2LjM2NS0xNS4zMjQsMjQuNDU4LTM2LjIxMywyNC4yNy02Mi42N2MxMS40Mi0xNC42NTcsMTcuMTI5LTMxLjU5NywxNy4xMjktNTAuODE5YzAtNC4xODUtMC4yODEtOC4yNzctMC44NTUtMTIuMjc4ICAgYzcuMjMtMTIuNzQ4LDEwLjg1NC0yNi40NTMsMTAuODU0LTQxLjExQzQ0NS4zOTksMjc4LjM3OSw0NDQuNTQ0LDI3MS44MDksNDQyLjgyOSwyNjUuNTMyeiBNODUuOTQ5LDM5Ni41OCAgIGMtMy42MTYsMy42MTQtNy44OTgsNS40MjgtMTIuODQ3LDUuNDI4Yy00Ljk1LDAtOS4yMzMtMS44MTMtMTIuODUtNS40MjhjLTMuNjE1LTMuNjEzLTUuNDI0LTcuODk3LTUuNDI0LTEyLjg1ICAgYzAtNC45NDgsMS44MDUtOS4yMjksNS40MjQtMTIuODQ3YzMuNjIxLTMuNjE3LDcuOS01LjQyNSwxMi44NS01LjQyNWM0Ljk0OSwwLDkuMjMxLDEuODA4LDEyLjg0Nyw1LjQyNSAgIGMzLjYxNywzLjYxNyw1LjQyNiw3Ljg5OCw1LjQyNiwxMi44NDdDOTEuMzc1LDM4OC42ODMsODkuNTY2LDM5Mi45NjcsODUuOTQ5LDM5Ni41OHogTTQxNC4xNDUsMjQyLjQxOSAgIGMtNC4wOTMsOC43NTQtOS4xODYsMTMuMjI3LTE1LjI3NiwxMy40MTVjMi44NTQsMy4yMzcsNS4yMzUsNy43NjIsNy4xMzksMTMuNTYyYzEuOTAyLDUuODA3LDIuODQ3LDExLjA4NywyLjg0NywxNS44NDggICBjMCwxMy4xMjctNS4wMzcsMjQuNDU1LTE1LjEyNiwzMy45NjljMy40Myw2LjA4OCw1LjE0MSwxMi42NTgsNS4xNDEsMTkuNjk3YzAsNy4wNDMtMS42NjMsMTQuMDM4LTQuOTk2LDIwLjk4NCAgIGMtMy4zMjcsNi45NC03Ljg1MSwxMS45MzgtMTMuNTU5LDE0Ljk4MmMwLjk1MSw1LjcwOSwxLjQyMywxMS4wNCwxLjQyMywxNS45ODhjMCwzMS43ODUtMTguMjc0LDQ3LjY3OC01NC44MjMsNDcuNjc4aC0zNC41MzYgICBjLTI0Ljk0LDAtNTcuNDgzLTYuOTQzLTk3LjY0OC0yMC44NDFjLTAuOTUzLTAuMzgtMy43MDktMS4zODMtOC4yOC0yLjk5OHMtNy45NDgtMi44MDYtMTAuMTM4LTMuNTY1ICAgYy0yLjE5LTAuNzY3LTUuNTE4LTEuODYxLTkuOTk0LTMuMjg1Yy00LjQ3NS0xLjQzMS04LjA4Ny0yLjQ3OS0xMC44NDktMy4xNDJjLTIuNzU4LTAuNjY0LTUuOTAxLTEuMjgzLTkuNDE5LTEuODU1ICAgYy0zLjUyLTAuNTcxLTYuNTE5LTAuODU1LTguOTkzLTAuODU1aC05LjEzNlYyMTkuMjg1aDkuMTM2YzMuMDQ1LDAsNi40MjMtMC44NTksMTAuMTM1LTIuNTY4YzMuNzExLTEuNzE0LDcuNTItNC4yODMsMTEuNDIxLTcuNzEgICBjMy45MDMtMy40MjcsNy41NjQtNi44MDUsMTAuOTkyLTEwLjEzOGMzLjQyNy0zLjMzLDcuMjMzLTcuNTE3LDExLjQyMi0xMi41NTljNC4xODctNS4wNDYsNy40Ny05LjA4OSw5Ljg1MS0xMi4xMzUgICBjMi4zNzgtMy4wNDUsNS4zNzUtNi45NDksOC45OTItMTEuNzA3YzMuNjE1LTQuNzU3LDUuODA2LTcuNjEzLDYuNTY3LTguNTY2YzEwLjQ2Ny0xMi45NDEsMTcuNzk1LTIxLjYwMSwyMS45ODItMjUuOTgxICAgYzcuODA0LTguMTgyLDEzLjQ2Ni0xOC42MDMsMTYuOTg3LTMxLjI2MWMzLjUyNS0xMi42Niw2LjQyNy0yNC42MDQsOC43MDMtMzUuODMyYzIuMjgyLTExLjIyOSw1LjkwMy0xOS4zMjEsMTAuODU4LTI0LjI3ICAgYzE4LjI2OCwwLDMwLjQ1Myw0LjQ3MSwzNi41NDIsMTMuNDE4YzYuMDg4LDguOTQ1LDkuMTM0LDIyLjc0Niw5LjEzNCw0MS4zOTljMCwxMS4yMjktNC41NzIsMjYuNTAzLTEzLjcxLDQ1LjgyMSAgIGMtOS4xMzQsMTkuMzItMTMuNjk4LDM0LjUtMTMuNjk4LDQ1LjUzOWgxMDAuNDk1YzkuNTI3LDAsMTcuOTkzLDMuNjYyLDI1LjQxMywxMC45OTRjNy40MjYsNy4zMjcsMTEuMTQzLDE1Ljg0MywxMS4xNDMsMjUuNTUzICAgQzQyMC4yODQsMjI1Ljk0Myw0MTguMjM3LDIzMy42NTMsNDE0LjE0NSwyNDIuNDE5eiIgZmlsbD0iI2ZmMDAwMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
          : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ3NS4wOTkgNDc1LjA5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwxLjIyNDY0Njc5OTE0NzM1MzJlLTE2LDEuMjI0NjQ2Nzk5MTQ3MzUzMmUtMTYsLTEsNS42ODQzNDE4ODYwODA4MDJlLTE0LDQ3NS4wOTkwMjk1NDEwMTU1NykiPjxzY3JpcHQ+CiAgICAgICAgLy8gQ2F0Y2ggZXJyb3JzIGlmIHNpZ25hbCBpcyBhbHJlYWR5IHNldCBieSB1c2VyIGFnZW50IG9yIG90aGVyIGV4dGVuc2lvbgogICAgICAgIHRyeSB7CiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdnbG9iYWxQcml2YWN5Q29udHJvbCcsIHsKICAgICAgICAgICAgICAgIHZhbHVlOiBmYWxzZSwKICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUKICAgICAgICAgICAgfSkKICAgICAgICAgICAgLy8gUmVtb3ZlIHNjcmlwdCB0YWcgYWZ0ZXIgZXhlY3V0aW9uCiAgICAgICAgICAgIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb2N1bWVudC5jdXJyZW50U2NyaXB0KQogICAgICAgIH0gY2F0Y2ggKGUpIHt9PC9zY3JpcHQ+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNNDQyLjgyOSwyNjUuNTMyYzkuMzI4LTE0LjA4OSwxMy45ODYtMjkuNTk4LDEzLjk4Ni00Ni41MzhjMC0xOS42MDctNy4yMjUtMzYuNjM3LTIxLjY4Ny01MS4xMTcgICBjLTE0LjQ2OS0xNC40NjUtMzEuNjAxLTIxLjY5Ni01MS4zOTQtMjEuNjk2aC01MC4yNTFjOS4xMzQtMTguODQyLDEzLjcwOS0zNy4xMTcsMTMuNzA5LTU0LjgxNmMwLTIyLjI3MS0zLjM0LTM5Ljk3MS05Ljk5Ni01My4xMDUgICBjLTYuNjYzLTEzLjEzOC0xNi4zNzItMjIuNzk1LTI5LjEyNi0yOC45ODRDMjk1LjMxMywzLjA5LDI4MC45NDcsMCwyNjQuOTU5LDBjLTkuNzEyLDAtMTguMjc0LDMuNTIxLTI1LjY5NywxMC41NjYgICBjLTguMTgzLDcuOTkzLTE0LjA4NCwxOC4yNzQtMTcuNjk5LDMwLjgzN2MtMy42MTcsMTIuNTU5LTYuNTIxLDI0LjYtOC43MDgsMzYuMTE2Yy0yLjE4NywxMS41MTUtNS41NjksMTkuNjUyLTEwLjEzNSwyNC40MSAgIGMtOS4zMjksMTAuMDg4LTE5LjUxMSwyMi4yNzMtMzAuNTUxLDM2LjU0N2MtMTkuMjI0LDI0LjkzMi0zMi4yNjQsMzkuNjg1LTM5LjExMyw0NC4yNTVINTQuODI4ICAgYy0xMC4wODgsMC0xOC43MDIsMy41NzQtMjUuODQsMTAuNzA2Yy03LjEzNSw3LjEzOS0xMC43MDUsMTUuNzUyLTEwLjcwNSwyNS44NDF2MTgyLjcyM2MwLDEwLjA4OSwzLjU2NiwxOC42OTksMTAuNzA1LDI1LjgzOCAgIGM3LjE0Miw3LjEzOSwxNS43NTIsMTAuNzExLDI1Ljg0LDEwLjcxMWg4Mi4yMjFjNC4xODgsMCwxNy4zMTksMy44MDYsMzkuMzk5LDExLjQyYzIzLjQxMyw4LjE4Niw0NC4wMTcsMTQuNDE4LDYxLjgxMiwxOC43MDIgICBjMTcuNzk3LDQuMjg0LDM1LjgzMiw2LjQyNyw1NC4xMDYsNi40MjdoMjYuNTQ1aDEwLjI4NGMyNi44MzYsMCw0OC40MzgtNy42NjYsNjQuODA5LTIyLjk5ICAgYzE2LjM2NS0xNS4zMjQsMjQuNDU4LTM2LjIxMywyNC4yNy02Mi42N2MxMS40Mi0xNC42NTcsMTcuMTI5LTMxLjU5NywxNy4xMjktNTAuODE5YzAtNC4xODUtMC4yODEtOC4yNzctMC44NTUtMTIuMjc4ICAgYzcuMjMtMTIuNzQ4LDEwLjg1NC0yNi40NTMsMTAuODU0LTQxLjExQzQ0NS4zOTksMjc4LjM3OSw0NDQuNTQ0LDI3MS44MDksNDQyLjgyOSwyNjUuNTMyeiBNODUuOTQ5LDM5Ni41OCAgIGMtMy42MTYsMy42MTQtNy44OTgsNS40MjgtMTIuODQ3LDUuNDI4Yy00Ljk1LDAtOS4yMzMtMS44MTMtMTIuODUtNS40MjhjLTMuNjE1LTMuNjEzLTUuNDI0LTcuODk3LTUuNDI0LTEyLjg1ICAgYzAtNC45NDgsMS44MDUtOS4yMjksNS40MjQtMTIuODQ3YzMuNjIxLTMuNjE3LDcuOS01LjQyNSwxMi44NS01LjQyNWM0Ljk0OSwwLDkuMjMxLDEuODA4LDEyLjg0Nyw1LjQyNSAgIGMzLjYxNywzLjYxNyw1LjQyNiw3Ljg5OCw1LjQyNiwxMi44NDdDOTEuMzc1LDM4OC42ODMsODkuNTY2LDM5Mi45NjcsODUuOTQ5LDM5Ni41OHogTTQxNC4xNDUsMjQyLjQxOSAgIGMtNC4wOTMsOC43NTQtOS4xODYsMTMuMjI3LTE1LjI3NiwxMy40MTVjMi44NTQsMy4yMzcsNS4yMzUsNy43NjIsNy4xMzksMTMuNTYyYzEuOTAyLDUuODA3LDIuODQ3LDExLjA4NywyLjg0NywxNS44NDggICBjMCwxMy4xMjctNS4wMzcsMjQuNDU1LTE1LjEyNiwzMy45NjljMy40Myw2LjA4OCw1LjE0MSwxMi42NTgsNS4xNDEsMTkuNjk3YzAsNy4wNDMtMS42NjMsMTQuMDM4LTQuOTk2LDIwLjk4NCAgIGMtMy4zMjcsNi45NC03Ljg1MSwxMS45MzgtMTMuNTU5LDE0Ljk4MmMwLjk1MSw1LjcwOSwxLjQyMywxMS4wNCwxLjQyMywxNS45ODhjMCwzMS43ODUtMTguMjc0LDQ3LjY3OC01NC44MjMsNDcuNjc4aC0zNC41MzYgICBjLTI0Ljk0LDAtNTcuNDgzLTYuOTQzLTk3LjY0OC0yMC44NDFjLTAuOTUzLTAuMzgtMy43MDktMS4zODMtOC4yOC0yLjk5OHMtNy45NDgtMi44MDYtMTAuMTM4LTMuNTY1ICAgYy0yLjE5LTAuNzY3LTUuNTE4LTEuODYxLTkuOTk0LTMuMjg1Yy00LjQ3NS0xLjQzMS04LjA4Ny0yLjQ3OS0xMC44NDktMy4xNDJjLTIuNzU4LTAuNjY0LTUuOTAxLTEuMjgzLTkuNDE5LTEuODU1ICAgYy0zLjUyLTAuNTcxLTYuNTE5LTAuODU1LTguOTkzLTAuODU1aC05LjEzNlYyMTkuMjg1aDkuMTM2YzMuMDQ1LDAsNi40MjMtMC44NTksMTAuMTM1LTIuNTY4YzMuNzExLTEuNzE0LDcuNTItNC4yODMsMTEuNDIxLTcuNzEgICBjMy45MDMtMy40MjcsNy41NjQtNi44MDUsMTAuOTkyLTEwLjEzOGMzLjQyNy0zLjMzLDcuMjMzLTcuNTE3LDExLjQyMi0xMi41NTljNC4xODctNS4wNDYsNy40Ny05LjA4OSw5Ljg1MS0xMi4xMzUgICBjMi4zNzgtMy4wNDUsNS4zNzUtNi45NDksOC45OTItMTEuNzA3YzMuNjE1LTQuNzU3LDUuODA2LTcuNjEzLDYuNTY3LTguNTY2YzEwLjQ2Ny0xMi45NDEsMTcuNzk1LTIxLjYwMSwyMS45ODItMjUuOTgxICAgYzcuODA0LTguMTgyLDEzLjQ2Ni0xOC42MDMsMTYuOTg3LTMxLjI2MWMzLjUyNS0xMi42Niw2LjQyNy0yNC42MDQsOC43MDMtMzUuODMyYzIuMjgyLTExLjIyOSw1LjkwMy0xOS4zMjEsMTAuODU4LTI0LjI3ICAgYzE4LjI2OCwwLDMwLjQ1Myw0LjQ3MSwzNi41NDIsMTMuNDE4YzYuMDg4LDguOTQ1LDkuMTM0LDIyLjc0Niw5LjEzNCw0MS4zOTljMCwxMS4yMjktNC41NzIsMjYuNTAzLTEzLjcxLDQ1LjgyMSAgIGMtOS4xMzQsMTkuMzItMTMuNjk4LDM0LjUtMTMuNjk4LDQ1LjUzOWgxMDAuNDk1YzkuNTI3LDAsMTcuOTkzLDMuNjYyLDI1LjQxMywxMC45OTRjNy40MjYsNy4zMjcsMTEuMTQzLDE1Ljg0MywxMS4xNDMsMjUuNTUzICAgQzQyMC4yODQsMjI1Ljk0Myw0MTguMjM3LDIzMy42NTMsNDE0LjE0NSwyNDIuNDE5eiIgZmlsbD0iIzAwMDAwMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
        }
        onClick={props.user===undefined?notLoggedIn:downvoted}
      />
    </div>
  );
  
  function upvoted(){
    if(!up===true){
        // upRef.current.name='arrow-up-circle';
        // downRef.current.name='arrow-down-circle-outline';
        const num = Number(totalUpRef.current.innerText) + 1;
        totalUpRef.current.innerText = num
        if(down){
          const num = Number(totalDownRef.current.innerText) - 1;
          totalDownRef.current.innerText = num
        }
    }
    else{
        // upRef.current.name='arrow-up-circle-outline';
        const num = Number(totalUpRef.current.innerText) - 1;
        totalUpRef.current.innerText = num
    }
     
    //if(!up===true) axios call to add upvote 
    //else axios call to remove upvote
    axiosCall('post', `${CONFIG.API_DOMAIN}/Question/votes/editVote`, {quesId : props.quesId, up : !up, isQues : props.isQues})
      .then(() => {
        // setUp false in downvoted function ensures that whatever is the state of upvote whether clicked or unclicked
        // so that we always downvote if downvote button gets clicked.
        // what will happen if we don't do this
        // U represents up
        // D represent down
        // consider the scenario -
        // U->D->U
        // the upstate == true then downstate == true then as upstate == true we will again decrement the
        // vote thinking that someone is removing its upvote rather increment the votes
        // so that's why we need to set state setUp false in downvoted function
        
        setDown(false);
          setUp(!up);
      });

  }
  function downvoted(){

      if(!down===true){
          // downRef.current.name='arrow-down-circle';
          // upRef.current.name='arrow-up-circle-outline';
          const num = Number(totalDownRef.current.innerText) + 1;
          totalDownRef.current.innerText = num
          //means upvoted
          if(up){
            const num = Number(totalUpRef.current.innerText) - 1;
            totalUpRef.current.innerText = num
          }

      }
      else{
          // downRef.current.name='arrow-down-circle-outline';
          const num = Number(totalDownRef.current.innerText) - 1;
          totalDownRef.current.innerText = num
      }

      //if(!down===true) axios call to add downvote 
      //else axios call to remove downvote
      axiosCall('post', `${CONFIG.API_DOMAIN}/Question/votes/editVote`, {quesId : props.quesId, down : !down,isQues : props.isQues})
        .then(() => {
            // same as above
            setUp(false)
            setDown(!down);
        });

  }
}


export default UpvoteDownvote;



// <div style={{display:"flex",alignItems:"center",marginTop:"20px"}}>
//         {/* <p style={{display:"inline-block"}} >Upvotes/Downvotes</p> &nbsp;&nbsp;&nbsp;&nbsp; */}
//       <span ref={totalUpRef} style={{ fontSize: 20 }}>{props.totalCount ? props.totalCount.up : null}</span>
//         {/* <button type="button" onClick={props.user===null?notLoggedIn:upvoted} style={{backgroundColor:"white",border:"0px solid white"}} style={!up ? { color:'black ' } : { color:'green' }} >
//           <ion-icon name={!up ? "chevron-up-circle-outline" : "chevron-up-circle"}  className="upvote"  style={{fontSize:"20px"}}></ion-icon>
//         </button> */}
//       {/* <ExpandLessIcon  style={!up ? { color:'black ',fontSize:40  } : { color:'green',fontSize:40  }} onClick={props.user===undefined?notLoggedIn:upvoted}/> */}
//       <ThumbsUpIcon src={ThumbsUpImg} up={up} onClick={props.user===undefined?notLoggedIn:upvoted} />
//         <span ref = {totalDownRef} style={{fontSize:20 }}>{props.totalCount ? props.totalCount.down : null}</span>
//         {/* <button type="button" onClick={props.user===null?notLoggedIn:downvoted} style={!down ? { color:'black ' } : { color:'#8b0000' }}>
//           <ion-icon name={!down? "chevron-down-circle-outline" : "chevron-down-circle"}  className="downvote" style={{fontSize:"20px"}}></ion-icon>
//         </button> */}
//         <ExpandMoreIcon  style={!down ? { color:'black ',fontSize:40 } : { color:'red',fontSize:40 }} onClick={props.user===undefined?notLoggedIn:downvoted}/>
//     </div>