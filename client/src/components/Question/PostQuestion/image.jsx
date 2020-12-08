import React, {useState, useEffect} from 'react';
import { RemoveCircle } from '@material-ui/icons';

export default function Image(props) {

    function showOver() {
        document.getElementById(`img_box_${props.id}_over`).style.zIndex = 2;
    }
    function hideOver() {
        document.getElementById(`img_box_${props.id}_over`).style.zIndex = -1;
    }

    useEffect(() => {
        document.getElementById(`img_box_${props.id}`).style.backgroundImage = `url(${props.image.src})`;
        document.getElementById(`img_box_${props.id}_over`).style.zIndex = -1;
    });


    return (
        <div className="img-box" id={`img_box_${props.id}`} onMouseOver={showOver} onMouseLeave={hideOver}>
            <div className="img-ovr" id={`img_box_${props.id}_over`} >
                <RemoveCircle className="remove-img-btn"
                    onClick={(event) => { props.remove(event, props.id) }} />
            </div>
            
        </div>
    )
}