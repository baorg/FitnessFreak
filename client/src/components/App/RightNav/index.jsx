import React from "react";
import styled from 'styled-components';
import Suggestion from './suggestions';

// Styled Components ===============================================================================================

const RightNavBar = styled.div`
    grid-column: 3 / 4;
    /* grid-area: right-nav; */

    padding-top: 50px;

    height: fit-content;
    display: flex;
    flex-direction: column;
`;

// ==================================================================================================================


export default function RightNav({ }) {
    return (
        <RightNavBar>
            <Suggestion />
        </RightNavBar>
    );
}