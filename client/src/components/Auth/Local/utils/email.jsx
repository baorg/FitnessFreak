export default function Email(props) {
    function handleChange(event) {
        props.setEmail({ value: event.target.value, error: null });
    }

    return (
        <>
            <label htmlFor={props.input.name}> {props.input.label}: </label>{props.email.error && <span className="err-dialog">{ props.email.error}</span>}
            <input
                value={props.email.value}
                onChange={handleChange}
                className="form-control"
                type="email"
                name={props.input.name}
                placeholder={props.input.placeholder} id="reg-mail" />
        </>
    );
}