import React from "react";
import DestinationCard from "./DestinationCard";

const FavoriteList = ({favoriteList, isLoaded, handleAddFavorite }) => {
    if (!isLoaded) return <h2>Loading...</h2>;

    const favoriteItems = favoriteList.map((fav) => 
      <li key={fav.id}>
        <DestinationCard  destination={fav.destination} handleAddFavorite={handleAddFavorite}/>
        <button>Remove from Favorites</button>
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