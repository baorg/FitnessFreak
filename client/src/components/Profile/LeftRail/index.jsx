import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

//  material UI ==============================

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

// =================================================
import CategorySelector from './CategorySelector';
import { responsive } from '../../utils/data.json';
import ajaxRequest from '../../../ajaxRequest';
import { UserContext } from '../../utils/UserContext';
import { NavContext } from '../../utils/NavContext';
import { API_DOMAIN } from '../../../config';


// Styled Components =====================================================

const LeftDiv = styled.div`
    margin-left: auto;
    margin-right: 2em;
    box-sizing: border-box;

    height: fit-content;
    min-width: 5em;
    min-height: 80vh;
    position: ${({drawer})=>drawer?"static":"sticky"};
    top: ${({drawer})=>drawer?"4em":"8em"};
    bottom: ${({drawer})=>drawer?"0":"2em"};
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-self: top;
    
    margin-top: 4em;

`;

//====================================================================================

const LeftNavBar = ({ matches, profile_user}) =>
    <LeftDiv drawer={matches}>
        <CategorySelector profile_user={profile_user}/>
    </LeftDiv>


export default function LeftRail({ profile_user }) {
    const [ user, ] = useContext(UserContext);
    const [ leftNavActive, setLeftNavActive] = useContext(NavContext).leftnav;
    const matches = useMediaQuery(`(max-width:${responsive.small})`);

    
    return (
      matches ? 
            <Drawer 
                open={leftNavActive} 
                onClose={closeLeftNav}>
                <LeftNavBar 
                    matches={matches} 
                    profile_user={profile_user} />
            </Drawer>:
                <LeftNavBar 
                    matches={matches} 
                    profile_user={profile_user}
                />
      
    );

    function closeLeftNav(){
        setLeftNavActive(false);
    }
}