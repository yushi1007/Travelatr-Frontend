import React from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const DestinationCard = ({ destination, handleAddFavorite }) => {
    const { id, name, image, description, likes } = destination
    const history = useHistory()
    const changeLocation = () => {
        history.push(`/destination/${id}`)
    }
    return (
        <div className="destination-card">
            <div className="image-container">
                <img src={image} alt={name} />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
            {/* <span className="like">♥{likes.length}</span> */}
            <button className="view-more-btn" onClick={changeLocation}>View More</button>
            {/* <Link to={`/destination/${id}`} className="view-more-btn">View More</Link> */}
        </div>
    )
}

export default DestinationCard;