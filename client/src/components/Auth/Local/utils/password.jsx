import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let PwdField = styled(TextField)`
    height: 100%;
`;

// ==============================================================================


export default function Password(props) {
    const [error, setError] = useState(true);

    return (
        <div className="form-group">
            <PwdField
                id="password"
                value={props.password.value}
                required
                variant="filled"
                onChange={handlePasswordChange}
                className="form-control" 
                required minLength="6" 
                type="password" name={props.name} 
                placeholder="enter password" 
                label={props.input.label}
                helperText={props.password.error}
            />
        </div>);
    
    async function handlePasswordChange(event) {
        await props.setPassword({ value: event.target.value, error: null });
    }
}