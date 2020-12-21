import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const StyledSpinner = styled(Spinner)`
    width: 100px;
    height: 100px;
    border-width: 5px;
`;

export default function(props){
    return (
        <StyledSpinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </StyledSpinner>);
}

