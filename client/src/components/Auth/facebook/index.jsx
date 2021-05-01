import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import Button from '@material-ui/core/Button';

import FacebookIcon from './facebook-icon.svg';
import logo from './facebook-login-btn.png';
import { API_DOMAIN } from '../../../config';


// Styled Components ======================================

const FacebookAuthBtn = styled(Button)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    background: #EFF2F4 !important;
    border-radius: 9px;
    cursor: pointer;
    text-decoration: none;
    text-transform: none !important;

    svg{
        margin: 0 30px 0 25px;
    }
    .facebook-img-btn{
        width: 100%;
        box-sizing: border-box;
        border-radius: 6px;
        cursor: pointer;
        place-self: center;
        justify-self: center;
    }
    .txt{
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        color: #424259;
        text-decoration: none;
    }
`;


// ===========================================================================


export default function FacbookAuth(props) {
    return (
        <FacebookAuthBtn
            startIcon={<ReactSVG src={ FacebookIcon}/>}
            href={`${API_DOMAIN}/auth/facebook`}>
            <div className="txt">Continue with facebook</div>
        </FacebookAuthBtn>
        
    );
}