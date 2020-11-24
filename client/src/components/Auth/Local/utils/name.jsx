export default function Name(props) {
    function handleNameChange(event) {
        props.setName({value: event.target.value, error: null});
    }

    return (
            <>
            {props.name.error && <span className="err-dialog" >{props.name.error}</span>}
            <input
                className="form-control"
                maxLength={props.input.max_length}
                type="text"
                name={props.input.name}
                placeholder={props.input.placeholder}
                value={props.name.value}
                onChange={handleNameChange}
                />
            </>
            );
}