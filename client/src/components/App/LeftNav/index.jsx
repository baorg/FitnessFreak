import React, { useState } from "react";
import styled from 'styled-components';
import { FaceRounded } from '@material-ui/icons'
// import axiosCall from '../../../ajaxRequest';
// import CONFIG from '../../../config';
import Category from './category';


const SideNavContainer = styled.div`
    /* position: fixed; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-column: 1 / 2;
    justify-self: center;
    position: relative;
    top: 10em;
`;



const SideNavBar = function(props) {
  const [categories,setCategories]=useState([
    { name: 'Beauty', icon: 'https://www.flaticon.com/svg/static/icons/svg/599/599560.svg', alt: 'Nail polish', title: 'Nail polish' },
    { name: 'Fashion', icon: 'https://www.flaticon.com/svg/static/icons/svg/3050/3050253.svg', alt: 'Dress free icon', title: 'Dress free icon' },
    { name: 'Fitness', icon: 'https://www.flaticon.com/svg/static/icons/svg/2964/2964514.svg', alt: 'Fitness free icon', title: 'Fitness free icon' },
    { name: 'Nutrition', icon: 'https://www.flaticon.com/premium-icon/icons/svg/561/561611.svg', alt: 'Diet premium icon', title: 'Diet premium icon' },
    { name: 'Health', icon: 'https://www.flaticon.com/svg/static/icons/svg/1142/1142172.svg', alt: 'Heartbeat free icon', title: 'Heartbeat free icon'},
    { name: 'Lifestyle', icon: 'https://www.flaticon.com/svg/static/icons/svg/2829/2829802.svg', alt: 'Balance', title: 'Balance'},
    { name: 'Sports', icon: 'https://www.flaticon.com/premium-icon/icons/svg/3311/3311579.svg', alt: 'Sports premium icon', title: 'Sports premium icon'},
    { name: 'Yoga', icon: 'https://www.flaticon.com/svg/static/icons/svg/2647/2647625.svg', alt: 'Lotus free icon', title: 'Lotus free icon'},
    { name: 'Entertainment', icon: 'https://www.flaticon.com/svg/static/icons/svg/3163/3163478.svg', alt: 'Popcorn free icon', title: 'Popcorn free icon' }
  ]);
  const [ranking,setRanking]=useState([]);
  // const [categories, setCategories] = useState([]);
  
    
    // useEffect(() => {
    //     let url = `${CONFIG.API_DOMAIN}/Question/getCategory`
    //     async function fun() {
    //         await axiosCall('GET', url)
    //             .then(function (resp) {
    //                 let b = JSON.parse(JSON.stringify(resp.data));
    //                 setCategories(b);
    //                 let a = resp.data;
    //                 a.push("Total", "Followers");
    //                 setRanking(a);
    //             }
    //             )
    //     }
    //     fun();
    // }, []);
    function hover() {
      document.querySelector('.categorybox').style.display='inline-block';
    }
    function unhover(){
      document.querySelector('.categorybox').style.display='none';
    }
    function hover2() {
      document.querySelector('.rankingbox').style.display='inline-block';
    }
    function unhover2(){
      document.querySelector('.rankingbox').style.display='none';
    }

    return (
            <SideNavContainer>
                {props.user && <div>
                                    <FaceRounded /> {props.user.username}
                                </div>}
            <hr style={{height:"2px", color:"black", width: "100%"}}/>
                <div>
                    {categories.map(category =>
                        <Category
                            selected={props.category === category}
                            category={category}
                            handleClick={() => { props.category === category ? props.setCategory(null) : props.setCategory(category); }}
                            />
                    )}
                </div>
            </SideNavContainer>
        );
}

export default SideNavBar;