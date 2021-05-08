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
    const [error, setError] = useState(true);
    const [showPwd, setShowPwd] = useState(false);

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
            type={showPwd ? 'text' : 'password'}
            error={props.password.error}
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
        await props.setPassword({ value: event.target.value, error: null });
    }

    function toggleShowPwd() {
        setShowPwd(oldPwd => !oldPwd);
    }
}