import { useState } from 'react';
import styled from 'styled-components';
import { A, navigate} from 'hookrouter';

// Material-UI ===================
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//  ===========================


import HomeIcon from '../../static/home_icon';
import BellIcon from '../../static/bell_icon'
import HeartIcon from '../../static/heart_icon';
import SettingsIcon from '../../static/settings_icon';


// Styled Components ==============================

let ToolTipContainer =  styled.div`
    position: relative;
    bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

let BottomContainer = styled.div`
    position: fixed;
    bottom: 0px;
    height: 60px;
    width: 100%;
    display: flex;
    background: #FFFFFF;
    align-items: center;
    box-shadow: 0px -20px 44px rgba(0, 0, 0, 0.07);
    justify-content: space-evenly;
    z-index: 1000;
`;

let ButtonContainer = styled.div`
    font-family: SF Pro;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    color: ${({selected})=>selected?"#065BFB":"#424259"};

    .name{
        height: 15px;
        width: 50px;
    }
`;

// ================================================


export default function({}){
    const [selected, setSelected] = useState('Home');

    return (
        <BottomContainer>
            <ButtonContainer 
                selected={selected==='Home'}
                onClick={changeState('Home')}
            >
                <HomeIcon />
                <div className="name">{selected==='Home' && "Home"}</div>
            </ButtonContainer>
            <ButtonContainer
                selected={selected==='Notifications'}
                onClick={changeState('Notifications')}
            >
                <BellIcon />
                <div className="name">{selected==='Notifications' && "Notifications"}</div>
            </ButtonContainer>
            <ToolTipContainer>
                <Tooltip 
                    title="Add" placement="bottom"
                    onClick={()=>navigate("/post-question")}
                >
                <Fab color="primary">
                    <AddIcon />
                </Fab>
                </Tooltip>
            </ToolTipContainer>
            <ButtonContainer
                selected={selected==='Likes'}
                onClick={changeState('Likes')}
            >
                <HeartIcon />
                <div className="name">{selected==='Likes' && "Likes"}</div>
            </ButtonContainer>
            <ButtonContainer
                selected={selected==='Settings'}
                onClick={changeState('Settings')}
            >
                <SettingsIcon />
                <div className="name">{selected==='Settings' && "Settings"}</div>
            </ButtonContainer>
        </BottomContainer>
    );

    function changeState(state){
        return (function(){
            switch(state){
                case 'Home':
                    setSelected('Home');
                    break;
                case 'Notifications':
                    setSelected('Notifications');
                    break;
                case 'Likes':
                    setSelected('Likes');
                    break;
                case 'Settings':
                    setSelected('Settings');
                    break;
                default:
                    setSelected('Home');
                    break;
            }
        })
    }
}