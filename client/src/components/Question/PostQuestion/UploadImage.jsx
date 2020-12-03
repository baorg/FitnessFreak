import React, {useEffect, useState} from 'react';
import { AddToPhotosRounded, RemoveCircle } from '@material-ui/icons';

export default function UploadImage(props) {
    const [addAllowed, setAddAllowed] = useState(true);

    useEffect(async () => {
        if (props.images.length >= 4)
            setAddAllowed(false);
        else
            setAddAllowed(true);
    }, [props.images])

    async function handleRemovePhoto(event, id) {
        props.setImages(props.images.filter((img, i) => i != id));
    }

    async function handleAddNewPic(event) {
        console.log('Adding new picture.....');
        props.setImages(props.images.concat(['https://picsum.photos/200']));
    }

    return (
        <div className="upload-images-container">
            {props.images.map((image, index) =>
                <div className="upload-img-box">
                    <img src={image} className="upload-img" id={index} />
                    <RemoveCircle className="remove-img-btn" onClick={(event) => { handleRemovePhoto(event, index) } } />
                </div>
                )}
            {addAllowed && <AddToPhotosRounded color="primary" className="add-img" style={{ fontSize: "4em" }} onClick={handleAddNewPic} />}
        </div>
    );
}