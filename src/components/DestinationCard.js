import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
    const {id, name, image, description } = destination
    return (
        <div className="destination-card">
            <div className="image-container">
                <img src={image} alt={name} />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
            <Link to={`/destination/${id}`} className="view-more-btn">View More</Link>
        </div>
    )
}

export default DestinationCard;