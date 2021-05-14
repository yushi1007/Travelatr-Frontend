import React from "react";
import DestinationCard from "./DestinationCard";

const FavoriteList = ({favoriteList, isLoaded, handleAddFavorite, handleDeleteFavorite, likesCount, destinations}) => {
    console.log(destinations)
   
    if (!isLoaded) return <h2>Loading...</h2>;
    const handleDeleteClick = (event) => {
        const id = event.target.id
        fetch(`http://localhost:7000/favorites/${id}`, {
            method: "DELETE",
        })
        .then(r => r.json())
        .then(handleDeleteFavorite)
    }
    
    const favoriteItems = favoriteList.map((fav) => 
      <span style={{width:"300px"}} key={fav.id}>
        <DestinationCard destination={fav.destination} handleAddFavorite={handleAddFavorite}/>
        <button id={fav.id} className="delete-btn" onClick={handleDeleteClick}><i className="fas fa-trash-alt"></i>REMOVE</button>
      </span>
    )
    return(
        <>
            <h1>My Favorite List</h1>
            <hr></hr>
        <div className="destination">
            {favoriteList ? favoriteItems : "loading"}
        </div>
        </>
    )
}

export default FavoriteList;