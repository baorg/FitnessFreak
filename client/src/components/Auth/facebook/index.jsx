import React, { useState } from 'react';
import styled from 'styled-components';

import logo from './facebook-login-btn.png';
import CONFIG from '../../../config';


// Styled Components ======================================

const FacebookAuthBtn = styled.div`
    width: 90%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    .facebook-img-btn{
        width: 100%;
        box-sizing: border-box;
        border-radius: 6px;
        cursor: pointer;
        place-self: center;
        justify-self: center;
        :hover{
            box-shadow: 0px 0px 3px 5px rgb(81, 165, 243);
        }
    }
`;


// ===========================================================================


export default function FacbookAuth(props) {

    return (
    <FacebookAuthBtn>
        <a href={`${CONFIG.API_DOMAIN}/auth/facebook`}>
            <img
                className="facebook-img-btn"
                src={logo}
                alt="facebook login button"
            />
        </a>
    </FacebookAuthBtn>
    );
}