export default function Password(props) {

    async function handlePasswordChange(event) {
        let pass2 = event.target.value;
        if (props.password1.value.length == 0) {
            document.getElementById('password-check').style.borderColor = "red";
            props.setPassword2({ value: "", error: null });
        }
        else if(props.password1.value!==pass2){
            document.getElementById('password-check').style.borderColor = "red";
            props.setPassword2({ value: pass2, error: null });
        }
        else {
            document.getElementById('password-check').style.borderColor = "green";
            props.setPassword2({ value: pass2, error: null });
        }
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor={props.input.name}>Retype Password</label>
                {props.password2.error && <span className="err-dialog">{ props.password2.error}</span>}
                <input
                    value={props.password2.value}
                    onChange={handlePasswordChange}
                    className="form-control"
                    required type="password"
                    name={props.name} id="password-check"
                    placeholder={props.input.placeholder} />
            </div>
        </>);
}