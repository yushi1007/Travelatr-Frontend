import React from "react";
import DestinationCard from "./DestinationCard";
import Search from "./Search";

const DestinationContainer = () => {
    return (
        <div className="destination-container">
            <h1>Top Place to Travel in 2021</h1>
            <Search/>
            <DestinationCard/>
        </div>
    )
}

export default DestinationContainer;