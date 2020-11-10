import React, { useState,useRef,useEffect } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


const SideNavBar = function(props) {

  return (

<SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} ><ion-icon name="add-outline"></ion-icon></i>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="categories">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} ><ion-icon name="list-outline"></ion-icon></i>
            </NavIcon>
            <NavText>
                Categories
            </NavText>
            <NavItem eventKey="categories/yoga">
                <NavText>
                    Yoga
                </NavText>
            </NavItem>
            <NavItem eventKey="categories/bodybuilding">
                <NavText>
                    Body Building
                </NavText>
            </NavItem>
            <NavItem eventKey="categories/zumba">
                <NavText>
                    Zumba
                </NavText>
            </NavItem>
            <NavItem eventKey="categories/gymnastics">
                <NavText>
                    Gymnastics
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>
  );

}

export default SideNavBar;