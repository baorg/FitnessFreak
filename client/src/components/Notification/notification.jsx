import React, { useState, useEffect, useRef } from "react";
import { navigate } from 'hookrouter';
import { Favorite, Notifications} from '@material-ui/icons';
import { Menu, MenuItem, Badge } from '@material-ui/core';

import styled from 'styled-components';

import '../styles.css';
import axiosCall from '../../ajaxRequest';
import './notification.css';
import CONFIG from '../../config';


const ITEM_HEIGHT = 48;


// Styled Components ==============================================================

const StyledFavorite = styled(Favorite)`
  cursor: pointer;
  margin-right: 1em;
`;
//  ================================================================================


export default function Notification(props) {
  const [noti, setNoti] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    axiosCall('get', `${CONFIG.API_DOMAIN}/question/getNotifications`)
      .then((res) => {
        if (res.data.err)
          navigate("/")
        console.log("notifications", res.data.notifications);
        setNoti(res.data.notifications);
      });
  }, []);

  return (
    <>
      <Badge
        badgeContent={noti.length} color="primary"
        max={10}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <StyledFavorite onClick={handleClick}/>
      </Badge>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          },
        }}
      >
        {noti.length>0?
          noti.map((option) => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          )) : <MenuItem>No notifications</MenuItem>
          }
      </Menu>
    </>
  );
  
  function handleClick(event){
    setAnchorEl(event.currentTarget);
  };

  function handleClose(){
    setAnchorEl(null);
  };
}




// <div>
//         {/* <Notifications onClick={handleclick} style={{color:"red"}}/> */}
//         <br />
//         <div className="nodisplay">
//           <h3 style={{ paddingBottom: "10px" }}>Notifications</h3>
//           {
//             noti.length > 5 ?
//               noti.slice((noti.length) - 5, noti.length).map((el, index) =>
//                 <div key={index} className="elem"><div dangerouslySetInnerHTML={{ __html: el }}></div></div>
//               )
//               :
//               noti.length === 0 ?
//                 <div className="elem"><p>No Notifications Yet</p></div>
//                 :
//                 noti.map((el, index) =>
//                   <div key={index} className="elem"><div dangerouslySetInnerHTML={{ __html: el }}></div></div>
//                 )
//           }
//           <a style={{ marginRight: "0px" }}>See all Notifications</a>
//         </div>
//       </div>