import React, { useEffect, useState } from 'react';
import { navigate } from "hookrouter";
import styled from 'styled-components';

import { responsive } from '../../utils/data.json';
import Navbar from "../../Navigation/navbar/navbar";
import CONFIG from '../../../config';
import PostQues from './PostQues';

// Styled Components =======================================

let ContentDiv = styled.div` 
    display: grid;
    position: relative;
    height: fit-content;
    min-height: 100%;
    top: 3em;
    place-content: center;

    @media(max-width: ${responsive.small}){
        top: 0px;
    }
`;
let MainDiv = styled(PostQues)`
    
`;
// =========================================================


export default function PostQuestion(props) {
    
    useEffect(() => {
        if (props.user === null) {
            navigate("/auth");
        }
    }, []);


    return (<ContentDiv>
                <MainDiv user={props.user} />
            </ContentDiv>);
}