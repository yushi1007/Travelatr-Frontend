import React from "react";
import { Link } from "react-router-dom";

import PhotosContainer from "./PhotosContainer"

const DestinationCard = ({ destination }) => {
    const {id, name, image, description, photos } = destination
    return (
        <div className="destination-card">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{description}</p>
            {/* <PhotosContainer photos={photos} /> */}
            <Link to={`/destination/${id}`} className="view-more-btn view-more-btn-1">View More</Link>
        </div>
    )
}

export default DestinationCard;