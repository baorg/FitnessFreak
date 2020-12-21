export default function Email(props) {
    function handleChange(event) {
        props.setEmail({ value: event.target.value, error: null });
    }

    return (
        <>
            <span>Email</span>
            <div className="form-row">
                {props.email.error && <span className="err-dialog" >{props.email.error}</span>}
                <input
                    value={props.email.value}
                    onChange={handleChange}
                    className="form-control"
                    type="email"
                    name={props.input.name}
                    placeholder={props.input.placeholder} id="reg-mail" />
            </div>
        </>);
}