import React, {useState, useEffect} from 'react';
import { RemoveCircle } from '@material-ui/icons';
import styled from 'styled-components';


// Styled Components =======================================

let ImageBox = styled.div`
    height: 8em;
    width: 8em;
    margin: 1em;
    border-radius: 10px;
`;

let ImageOvr = styled.div`
    z-index: 2;
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: max-content auto max-content;
    grid-template-areas: ". . remo" ". . ." ". upload .";
    background-color: rgba(56, 50, 50, 0.452);
`;

let StyledRemoveCircle = styled(RemoveCircle)`
    color: white;
    font-size: 25px;
    border-radius: 100%;
    cursor: pointer;
    border-radius: 5px;
    grid-area: remo;
    align-self: center;
    justify-self: center;
    margin: 5px;
`;
// =========================================================



export default function Image(props) {

    function showOver() {
        document.getElementById(`img_box_${props.id}_over`).style.zIndex = 2;
    }
    function hideOver() {
        document.getElementById(`img_box_${props.id}_over`).style.zIndex = -1;
    }

    useEffect(() => {
        document.getElementById(`img_box_${props.id}`).style.backgroundImage = `url(${props.image.src})`;
        document.getElementById(`img_box_${props.id}_over`).style.zIndex = -1;
    });


    return (
        <ImageBox id={`img_box_${props.id}`} onMouseOver={showOver} onMouseLeave={hideOver}>
            <ImageOvr id={`img_box_${props.id}_over`} >
                <StyledRemoveCircle
                    onClick={(event) => { props.remove(event, props.id) }} />
            </ImageOvr>
        </ImageBox>
    )
}