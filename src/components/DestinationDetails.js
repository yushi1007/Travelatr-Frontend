import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FlightSearch from "./FlightSearch";
import ReviewList from "./ReviewList";
import PhotosContainer from "./PhotosContainer";

const DestinationDetails = ({user}) => {
    const [destination, setDestination] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const {id} = useParams()
    
    useEffect(() => {
        fetch(`http://localhost:7000/destinations/${id}`)
        .then(r => r.json())
        .then((destination) => {
            setDestination(destination)
            setIsLoaded(true)
        })
    }, [id])
    
    if (!isLoaded) return <h2>Loading...</h2>;
    
    const { name, image, description, us, airport_code, photos, rating, reviews, user_ratings_total, likes } = destination
    
    const handleLikeClick = () => {
        fetch("http://localhost:7000/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user.id, destination_id: id })
        })
        .then(r => r.json())
        .then(destination => {
            setDestination(destination)
            console.log(destination)
        })
    }

    return(
        <div className="destination-details">
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <button className="like-btn" onClick={handleLikeClick}>{likes.length} Likes 💙</button>
            <p>{description}</p>
            <p>{us ? "Domestic" : "International"}</p>
            <p>Airport code: {airport_code}</p>
            <span style={{display: rating ? "block" : "none" }}>
                <p>{rating}</p>
                <p>{reviews ? <ReviewList reviews={reviews} /> : null }</p>
                <p>{user_ratings_total} reviews </p>
            </span>
            <PhotosContainer photos={photos} />
            <FlightSearch />
        </div>
    )
}

export default DestinationDetails;