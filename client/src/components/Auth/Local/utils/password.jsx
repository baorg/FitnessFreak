export default function Password(props) {
    
    async function handlePasswordChange(event) {
        await props.setPassword({ value: event.target.value, error: null });
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor={props.input.name}>{props.input.label}</label>
                {props.password.error && <span className="err-dialog">{ props.password.error}</span>}
                <input 
                    value={props.password.value}
                    onChange={handlePasswordChange}
                    className="form-control" 
                    required minLength="6" 
                    type="password" name={props.name} 
                    id="password" placeholder="enter password" />
            </div>
        </>);
}