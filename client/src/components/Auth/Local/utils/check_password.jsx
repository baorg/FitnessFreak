import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let PwdField = styled(TextField)`
    border-color: ${({ matched }) => matched ? "green" : "red"};
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
    const [matched, setMatched] = useState(false);

    return (
        <PwdField
            id="filled-basic"
            // label="Retype Password"
            required
            variant="outlined"
            value={props.password2.value}
            onChange={handlePasswordChange}
            className="form-control"
            type="password"
            name={props.name}
            placeholder={props.input.placeholder} 
            error={!matched}
            helperText={props.password2.error}
            />);

    async function handlePasswordChange(event) {
            let pass2 = event.target.value;
            if (props.password1.value.length === 0) {
                setMatched(false);
                props.setPassword2({ value: "", error: null });
            }
            else if(props.password1.value!==pass2){
                setMatched(false);
                props.setPassword2({ value: pass2, error: null });
            }
            else {
                setMatched(true);
                props.setPassword2({ value: pass2, error: null });
            }
        }

}