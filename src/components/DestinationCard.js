import React from "react";
import { Link } from "react-router-dom";


const DestinationCard = ({ destination, likesClick, setLikesClick }) => {
    const { id, name, image, description, likes } = destination

    return (
        <div className="destination-card">
            <div className="image-container">
                <img src={image} alt={name} />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
            <span className="like">♥{likes.length}</span>
            <Link to={`/destination/${id}`} className="view-more-btn">View More</Link>
        </div>
    )
}

export default DestinationCard;