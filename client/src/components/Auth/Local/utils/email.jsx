import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let EmailField = styled(TextField)`
    height: 100%;
`;

// ==============================================================================

export default function Email({ input, email, setEmail }) {

    return (
        <div className="form-row">
            <EmailField
                id="reg-mail"
                value={email.value}
                onChange={handleChange}
                className="form-control"
                type="email"
                name={input.name}
                label="Email"
                helperText={email.error}
                error={Boolean(email.error)}
                placeholder={input.placeholder}
                required
                variant="filled"
            />
        </div>);
    
    function handleChange(event) {
        setEmail({ value: event.target.value, error: null });
    }
}