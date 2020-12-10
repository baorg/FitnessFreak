import React,{useState,useEffect,useRef} from "react"
import '../styles.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import './notification.css'
import axiosCall from '../../ajaxRequest' 
import {ENDPOINT} from '../utils';
import {navigate} from 'hookrouter'

const Notification = function(props){

    // let arr=["liked","subscribed"];
    const [noti,setNoti]=useState([]);
    useEffect(() => {
        axiosCall('get', `${ENDPOINT}/Question/getNotifications`)
        .then((res) => {
          if(res.data.err)
            navigate("/")
        
          console.log("notifications",res.data.notifications);
          setNoti(res.data.notifications);
        })
      }, []);
    function handleclick(){
        document.querySelector('.nodisplay').classList.toggle('notis');
    }
    return(
        <div>
        <NotificationsIcon onClick={handleclick} style={{color:"red"}}/>
        <br />
        <div className="nodisplay">
            {
                noti.length>5?
                noti.slice((noti.length)-5,noti.length).map((el,index) => 
                    <div key={index} className="elem"><div dangerouslySetInnerHTML={{ __html: el }}></div></div>
                )
                :
                noti.length===0?
                <div className="elem"><p>No Notifications Yet</p></div>
                :
                noti.map((el,index) => 
                <div key={index} className="elem"><div dangerouslySetInnerHTML={{ __html: el }}></div></div>
                )
            }
        </div> 
        </div>
  )
    
}

export default Notification;