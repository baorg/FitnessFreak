import React, { useEffect, useState } from 'react';
import { navigate } from "hookrouter";
import styled from 'styled-components';


import Navbar from "../../Navigation/navbar/navbar";
import CONFIG from '../../../config';
import PostQues from './PostQues';

// Styled Components =======================================

let ContentDiv = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 1fr 600px 1fr;
    height: fit-content;
    min-height: 40em;
    top: 3em;
`;
let LeftDiv = styled.div`

`;

let RightDiv = styled.div`

`;
let MainDiv = styled(PostQues)`
    
`;
// =========================================================


export default function PostQuestion(props) {
    
    useEffect(() => {
        console.log('User:', props.user);
        if (props.user === null) {
            navigate("/auth");
        }
    }, []);


    return (
        <>
            <Navbar user={props.user} />
            <ContentDiv>
                <LeftDiv />
                <MainDiv user={props.user} />
                <RightDiv />
            </ContentDiv>
        </>);
}