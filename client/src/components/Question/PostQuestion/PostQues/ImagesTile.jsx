import React, {useEffect, useState} from 'react';
import { AddToPhotosRounded, RemoveCircle } from '@material-ui/icons';
import { Spinner } from 'react-bootstrap'
import Image from './image';
    
export default function ImagesTile(props) {
    const [addAllowed, setAddAllowed] = useState(true);

    const maxAllowed = 5;

    useEffect(async () => {
        if (props.images.length >= maxAllowed)
            setAddAllowed(false);
        else
            setAddAllowed(true);
    }, [props.images])

    async function fileSelected(event) {
        let file = event.target.files[0];
        console.log('Adding image: ', {
            src: URL.createObjectURL(file),
            file: file,
            uploaded: false
        });
        props.setImages(props.images.concat({
            src: URL.createObjectURL(file),
            file: file,
            uploaded: false
        }));
    }
    
    async function updateSingleImage(id, image) {
        props.setImages(props.images.map((img, i) => {
            if (i === id)
                return image;
            else
                return img;
        }));
    }

    async function handleRemovePhoto(event, id) {
        props.setImages(props.images.filter((img, i) => i != id));
    }

    async function handleAddNewPic(event) {
        // console.log('Adding new picture.....');
        // setAddAllowed(false);
        // setSelecting(true);
        // setRequestUpload(false);
        
        document.getElementById('attachment').click();
    }

    function AddButton() {
        switch (true) {
            case addAllowed:
                return <AddToPhotosRounded color="primary" className="add-img" style={{ fontSize: "4em" }} onClick={handleAddNewPic} ></AddToPhotosRounded>
            default:
                return <></>;
        }
    }


    return (
        <div className="images-container">
            { props.images.map((image, index) =>
                <Image image={image} id={index}
                    remove={handleRemovePhoto}
                    updateSingleImage={updateSingleImage}
                        />)}
            {
                props.submitting ? <></> :
                    <>
                        <input type="file" className="file" id="attachment" style={{ display: "none" }} onChange={fileSelected} />
                        <AddButton />
                    </>
            }
            
        </div>
    );
}