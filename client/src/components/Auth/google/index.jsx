import React from 'react';
import { ReactSVG } from 'react-svg';
import { navigate, A } from 'hookrouter';
import GoogleIcon from './google-icon.svg';
import styled from 'styled-components';
import { API_DOMAIN } from '../../../config';

let GoogleIconContainer = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
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


export default function GoogleAuth(props) {
    return (
        <a href={`${API_DOMAIN}/auth/google`}>
            <GoogleIconContainer >
                <ReactSVG
                    src={GoogleIcon}
                />
                <div className="txt">Continue with google</div>
            </GoogleIconContainer>
        </a>
    );
}