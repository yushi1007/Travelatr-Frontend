import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
    const {id, name, image, description } = destination
    return (
        <div className="destination-card">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{description}</p>
            <Link to={`/destination/${id}`} className="view-more-btn">View More<span></span></Link>
        </div>
    )
}

export default DestinationCard;