import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let NameField = styled(TextField)`
    height: 100%;
    background-color: #EFF2F4;
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color:white;
      }
    }
`;

// ==============================================================================

export default function Name({name, setName, input}) {
    return (
        <NameField
            className="form-control"
            maxLength={input.max_length}
            type="text"
            name={input.name}
            required={input.required}
            placeholder={input.placeholder}
            value={name.value}
            onChange={handleNameChange}
            helperText={name.error}
            error={Boolean(name.error)}
            variant="outlined"
        />);
    
    function handleNameChange(event) {
        setName({value: event.target.value, error: null});
    }
}