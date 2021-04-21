import React from "react";
import DestinationCard from "./DestinationCard";

const FavoriteList = ({favoriteList, isLoaded, handleAddFavorite, handleDeleteFavorite }) => {
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
      <li key={fav.id}>
        <DestinationCard  destination={fav.destination} handleAddFavorite={handleAddFavorite}/>
        <button id={fav.id} className="delete-btn" onClick={handleDeleteClick}>Remove from Favorites</button>
      </li>
    )
    return(
        <div className="favorite-container">
            <h1>My Favorite List</h1>
            {favoriteList ? favoriteItems : "loading"}
        </div>
    )
}

export default FavoriteList;