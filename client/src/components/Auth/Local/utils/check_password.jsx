import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Styled Components =========================================================

let PwdField = styled(TextField)`
    border-color: ${({ matched }) => matched ? "green" : "red"};
    height: 100%;
`;

// ==============================================================================

export default function Password(props) {
    const [matched, setMatched] = useState(false);

    return (
        <>
            <div className="form-group">
                {/* <label htmlFor={props.input.name}>Retype Password</label> */}
                {/* {props.password2.error && <span className="err-dialog">{ props.password2.error}</span>} */}
                <PwdField
                    id="filled-basic"
                    label="Retype Password"
                    required
                    variant="filled"
                    value={props.password2.value}
                    onChange={handlePasswordChange}
                    className="form-control"
                    type="password"
                    name={props.name}
                    placeholder={props.input.placeholder} 
                    error={!matched}
                    helperText={props.password2.error}
                    />
            </div>
        </>);

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