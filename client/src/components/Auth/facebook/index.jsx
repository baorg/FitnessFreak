import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

import FacebookIcon from './facebook-icon.svg';
import logo from './facebook-login-btn.png';
import { API_DOMAIN } from '../../../config';


// Styled Components ======================================

const FacebookAuthBtn = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    background: #EFF2F4;
    border-radius: 9px;
    cursor: pointer;
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
        color: #424259;;
    }
`;


// ===========================================================================


export default function FacbookAuth(props) {

    return (
        <a href={`${API_DOMAIN}/auth/facebook`}>
            <FacebookAuthBtn>
                <ReactSVG
                    src={ FacebookIcon}/>
                <div className="txt">Continue with facebook</div>
            </FacebookAuthBtn>
        </a>
        
    );
}