import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FlightSearch from "./FlightSearch";
import ReviewList from "./ReviewList";
import PhotosContainer from "./PhotosContainer";

const DestinationDetails = ({user, handleAddFavorite, favoriteList}) => {
    const {id} = useParams()
    
    // console.log(initialFav, "initialFav")
    // console.log(initialState, "initial state")
    // console.log(user.favorites, "user's favorite")
    // console.log(id, "destination id")
    
    const [destination, setDestination] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [favorite, setFavorite] = useState(false)
    
    const handleSetFavorite = (newFavorite) => {
        setFavorite(favorite => !favorite)
        handleAddFavorite(newFavorite)
    }
    
    
    useEffect(() => {
        fetch(`http://localhost:7000/destinations/${id}`)
        .then(r => r.json())
        .then((destination) => {
            const initialFav = favoriteList.find((fav) => {
                    return fav.destination.id === parseInt(id)
                })
            if (initialFav) {
                 setFavorite(true)
                } else {
                 setFavorite(false)
                }
            setDestination(destination)
            setIsLoaded(true)
        })
    }, [])

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

    const handleFavoriteClick = () => {
        fetch("http://localhost:7000/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { user_id: user.id, destination_id: id } )
        })
        .then(r => r.json())
        .then((newFavorite) => {
            handleSetFavorite(newFavorite)})
    }

    return(
    <div className="details-box">
        <div className="destination-details">
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <button className="like-btn" onClick={handleLikeClick}>{likes.length} Likes 💙</button>
            <button className="fav-btn" onClick={handleFavoriteClick}>{favorite ? "Added" : "Add"} to favorites</button>
            <p>{description}</p>
            <p>{us ? "Domestic" : "International"}</p>
            <p>Airport code: {airport_code}</p>
        </div>
            <FlightSearch />
        <div className="review-details">
            <span style={{display: rating ? "block" : "none" }}>
                <p>{rating}</p>
                <p>{reviews ? <ReviewList reviews={reviews} /> : null }</p>
                <p>{user_ratings_total} reviews </p>
            </span>
        </div>
            <PhotosContainer photos={photos} />
    </div>
    )
}
// CRUD DONE
export default DestinationDetails;