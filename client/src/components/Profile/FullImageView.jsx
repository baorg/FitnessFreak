import {
    Dialog, DialogTitle
} from '@material-ui/core';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    display: ${({ open }) => open ? "grid" : "none"};
    place-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(100, 100, 100, 0.8);
`;

const ImageContainer = styled.div`
    width: 70vw;
    height: 70vh;
    display: grid;
    place-content: center;
    .img{
        max-width: 100%;
        max-height: 100%;
    }
`;



export default function FullImageView({ image, open, handleClose }) {
    console.log("backdrop: ", open, '\nImage: ', image);
    
    return (
        <StyledBackdrop open={open} onClick={handleClose}>
            <ImageContainer>
                <img src={image} className="img" />
            </ImageContainer>
        </StyledBackdrop>
    );
}