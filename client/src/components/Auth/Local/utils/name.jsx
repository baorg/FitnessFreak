import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let NameField = styled(TextField)`
    height: 100%;
`;

// ==============================================================================

export default function Name({name, setName, input}) {
    return (
        <NameField
            className="form-control"
            maxLength={input.max_length}
            type="text"
            name={input.name}
            label={input.label}
            required={input.required}
            placeholder={input.placeholder}
            value={name.value}
            onChange={handleNameChange}
            helperText={name.error}
            error={Boolean(name.error)}
            variant="filled"
        />);
    
    function handleNameChange(event) {
        setName({value: event.target.value, error: null});
    }
}