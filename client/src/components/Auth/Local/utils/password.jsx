import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let PwdField = styled(TextField)`
    height: 100%;
    background-color: #EFF2F4;
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color:#EFF2F4;
      }
    }
`;

// ==============================================================================


export default function Password(props) {
    const [error, setError] = useState(true);

    return (
        <PwdField
            id="password"
            value={props.password.value}
            required
            variant="outlined"
            onChange={handlePasswordChange}
            className="form-control" 
            required minLength="6" 
            type="password" name={props.name} 
            placeholder="Password" 
            helperText={props.password.error}
        />);
    
    async function handlePasswordChange(event) {
        await props.setPassword({ value: event.target.value, error: null });
    }
}