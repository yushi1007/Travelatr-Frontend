import React, { useState, useEffect } from "react";
import DestinationCard from "./DestinationCard";
import Search from "./Search";

const DestinationContainer = () => {
    const [destinations, setDestinations] = useState([])
    const [searchText, setSearchText] = useState("")
    const [checkBox, setCheckBox] = useState(false)
    const [sort, setSort] = useState("popularity")

    useEffect(() => {
        fetch("http://localhost:3000/destinations")
        .then(r => r.json())
        .then(setDestinations)
    }, [])

    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

    const handleCheckBox = () => {
        setCheckBox(checkBox => !checkBox)
    }

    const handleSort = (event) => {
        setSort(event.target.value)
    }
    
    const searchedDestinations = destinations.filter((destination) => destination.name.toLowerCase().includes(searchText.toLowerCase()))

    const destinationsToDisplay = [...searchedDestinations]
    .filter((destination) => {
        if (checkBox) {
            return destination.us
        } else {
            return destination
        }
        })
    .sort((a, b) => {
        if (sort === "name") {
            return a.name.localeCompare(b.name)
        } else {
            return 0
        }
    })

    const destinationCards = destinationsToDisplay.map((destination) => {
        return <DestinationCard key={destination.id} destination={destination}/>
    })
    return (
        <div className="destination-container">
            <h1>Top Place to Travel in 2021</h1>
            <Search 
                searchText={searchText} 
                onSearch={handleSearchText} 
                checkBox={checkBox} 
                onCheckBox={handleCheckBox}
                sort={sort}
                onSort={handleSort}
                />
            {destinationCards}
        </div>
    )
}

export default DestinationContainer;