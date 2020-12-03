import React,{useState,useEffect,useRef} from "react"
import '../styles.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import './notification.css'

const Notification = function(props){

    let arr=["liked","subscribed"];
    // useEffect(() => {
    //     axiosCall('post', `${ENDPOINT}/Question/isBookMarked`, {quesId : props.quesId})
    //     .then((res) => {
    //       if(res.data.err)
    //         navigate("/")
    //       console.log("isMarked = ", res.data)
    //       setMarked(res.data.marked)
    //     })
    //   }, []);
    function handleclick(){
        document.querySelector('.nodisplay').classList.toggle('display');
    }
    return(
        <>
  <button onClick={handleclick}><NotificationsIcon /></button>
  {/* <div className="tagsearch">
  {arr.map((el,index)=><div key={index} className="nodisplay">{el}</div>)}
       </div>  */}
        </>
  )
    
}

export default Notification;