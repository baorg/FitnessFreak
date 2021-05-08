import styled from 'styled-components';
import { useState } from 'react';
import { TextField } from '@material-ui/core'

// Material-UI
// core
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';




// Styled Components =========================================================
let PwdField = styled(OutlinedInput)`
    border-color: ${({ matched }) => matched ? "green" : "red"};
    height: 100%;
    background-color: #EFF2F4;
    & .MuiOutlinedInput-root {
      & fieldset {
        border-color:#EFF2F4;
      }
    }

    .icon-btn{
        border-width: 0;
        outline-style: none;
    }
`;

// ==============================================================================

export default function Password(props) {
    const [matched, setMatched] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

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
            type={showPwd ? 'text' : 'password'}
            error={props.password2.error}
            aria-describedby={"password"}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        className="icon-btn"
                        aria-label="toggle password visibility"
                        onClick={toggleShowPwd}>
                        {showPwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </InputAdornment>
            }
            inputProps={{
                'aria-label': 'password',
            }}
            labelWidth="10px" />);

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

    function toggleShowPwd() {
        setShowPwd(oldPwd => !oldPwd);
    }
}