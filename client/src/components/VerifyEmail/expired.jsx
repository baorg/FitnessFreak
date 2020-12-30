import React from 'react';
import styled from 'styled-components';
import { A } from 'hookrouter';
// Styled Components =================================================================

let MainDiv = styled.div`
    position: relative;
    top: 0;
    left:0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
`;
// ====================================================================================


export default function ExpiredToken(props) {
    

    return (
        <MainDiv>
            <div>Token is Expired</div>
            <A href="/">Home</A>
        </MainDiv>
    )
}