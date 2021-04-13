import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let EmailField = styled(TextField)`
    height: 100%;
    background-color: #EFF2F4;
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color:#EFF2F4;
      }
    }
`;

// ==============================================================================

export default function Email({ input, email, setEmail }) {

    return (
            <EmailField
                id="reg-mail"
                value={email.value}
                onChange={handleChange}
                className="form-control"
                type="email"
                name={input.name}
                // label="Email"
                helperText={email.error}
                error={Boolean(email.error)}
                placeholder={input.placeholder}
                required
                variant="outlined"
            />);
    
    function handleChange(event) {
        setEmail({ value: event.target.value, error: null });
    }
}