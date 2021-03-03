import React, { useState, useContext } from "react";
import { A } from 'hookrouter';
import styled from 'styled-components';

// Material-UI ----------------------------------------

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import useMediaQuery from '@material-ui/core/useMediaQuery';


import  FaceRoundedIcon from '@material-ui/icons/FaceRounded';



// ------------------------------------------------------------------
// import axiosCall from '../../../ajaxRequest';
// import CONFIG from '../../../config';
import Category from './category';


import { NavContext } from '../../utils/NavContext';
import { UserContext } from '../../utils/UserContext';
import { responsive } from '../../utils/data.json';

// Styled Components =================================================================

const SideNavContainer = styled.div`

    height: 80vh;
    width: 100%;
    box-sizing: border-box;

    grid-column: 1 / 2;

    position: ${({drawer})=>drawer?"static":"sticky"};
    top: ${({drawer})=>drawer?"0":"6em"};
    bottom: ${({drawer})=>drawer?"0":"2em"};
    
    overflow-y: auto;

    ::-webkit-scrollbar-thumb {
      background-color: rgb(78, 78, 78);
      outline: 1px solid rgb(210, 230, 250);
      border-radius: 2px;
    }
    ::-webkit-scrollbar {
      width: 0.8em;
      border-radius: 100px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px transparent;
      margin-left: -2em;
    }
 



    .snavdat{
      position: relative;
      top: 0;
      min-height: 100%;
      box-sizing: border-box;

      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      align-items: center;
      justify-self: center;

      .users{

      }

      .divider{
        height: 2px;
        color: black;
        width: 300px;
      }

      .link{
        margin-left: 10px;
        font-size: 1.5em;
        justify-content: center;
      }

      .category-list{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 10px 0 10px 0;
        min-height: min-content;
        font-size: 1.2em;
      
        .category-el{
          box-sizing: border-box;
        }
      }
    }
    
`;

// ======================================================================================


const SideNavBar = function ({ setSelectedCategories, selectedCategories }) {
  const [categories, setCategories] = useState([
    { name: 'Beauty', icon: 'https://www.flaticon.com/svg/static/icons/svg/599/599560.svg', alt: 'Nail polish', title: 'Nail polish' },
    { name: 'Fashion', icon: 'https://www.flaticon.com/svg/static/icons/svg/3050/3050253.svg', alt: 'Dress free icon', title: 'Dress free icon' },
    { name: 'Fitness', icon: 'https://www.flaticon.com/svg/static/icons/svg/2964/2964514.svg', alt: 'Fitness free icon', title: 'Fitness free icon' },
    { name: 'Nutrition', icon: 'https://www.flaticon.com/premium-icon/icons/svg/561/561611.svg', alt: 'Diet premium icon', title: 'Diet premium icon' },
    { name: 'Health', icon: 'https://www.flaticon.com/svg/static/icons/svg/1142/1142172.svg', alt: 'Heartbeat free icon', title: 'Heartbeat free icon' },
    { name: 'Lifestyle', icon: 'https://www.flaticon.com/svg/static/icons/svg/2829/2829802.svg', alt: 'Balance', title: 'Balance' },
    { name: 'Sports', icon: 'https://www.flaticon.com/premium-icon/icons/svg/3311/3311579.svg', alt: 'Sports premium icon', title: 'Sports premium icon' },
    { name: 'Yoga', icon: 'https://www.flaticon.com/svg/static/icons/svg/2647/2647625.svg', alt: 'Lotus free icon', title: 'Lotus free icon' },
    { name: 'Entertainment', icon: 'https://www.flaticon.com/svg/static/icons/svg/3163/3163478.svg', alt: 'Popcorn free icon', title: 'Popcorn free icon' }
  ]);

  
  const [user, ] = useContext(UserContext)
  const [leftNavActive, setLeftNavActive] = useContext(NavContext).leftnav;
  const matches = useMediaQuery(`(max-width:${responsive.small})`);



  
  return (
      matches ? 
        <Drawer open={leftNavActive} onClose={closeLeftnav}>
          <LeftNavContent />
        </Drawer>:
      <LeftNavContent />
      
    );
  
  function handleCategoryCheck(category, checked) {
    if (checked) {
      if (selectedCategories)
        setSelectedCategories([...selectedCategories, category]);
      else
        setSelectedCategories([category]);
    } else {
      let result = selectedCategories.filter(cat => cat !== category);
      if (result.length === 0)
        setSelectedCategories(null);
      else
        setSelectedCategories(result);
    }
  }
  function closeLeftnav(){
    setLeftNavActive(false);
  }

  function LeftNavContent(){
    return (
      <SideNavContainer drawer={matches} className="left-nav">
        <div className="snavdat">
          <div className="users">
            <FaceRoundedIcon />
            <A className="link" href="/rankings">Users</A>
          </div>
          <hr className="divider" />
            {categories.map(category =>
              <Category

                selected={selectedCategories!==null && selectedCategories.some(cat => cat === category.name)}
                category={category}
                handleChange={(event) => handleCategoryCheck(category.name, event.target.checked)}
              />
            )}
        </div>
        
      </SideNavContainer>);
  }
}

export default SideNavBar;