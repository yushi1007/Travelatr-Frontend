import React from "react";

const DestinationCard = ({destination}) => {
    const { name, image, description } = destination
    return (
        <div className="destination-card">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{description}</p>
            <button className="view-more-btn">View More<span></span></button>
        </div>
    )
}

export default DestinationCard;