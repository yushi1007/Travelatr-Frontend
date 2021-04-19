import React from "react";

const DestinationCard = ({destination}) => {
    const { name, image, description } = destination
    return (
        <div className="destination-card">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{description}</p>
        </div>
    )
}

export default DestinationCard;