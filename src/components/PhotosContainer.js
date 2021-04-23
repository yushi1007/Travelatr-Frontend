import Photo from "./Photo";
import { useState } from "react";

export default function PhotosContainer ({photos}) {
    const [photoIndex, setPhotoIndex] = useState(0)

    const photoItems = photos.slice(photoIndex, photoIndex + 2).map((photo) =>
        <Photo key={photo} photo={photo}/>
    )

    function handleClickMore () {
        setPhotoIndex(photoIndex => (photoIndex + 2) % photos.length)
    }
    return (
        <div className="photo-container">
            <div>
                {photoItems}
            </div>
            <div>
                <button className="flight-button more" onClick={handleClickMore}>Show more photo</button>
            </div>
        </div>
    )
}