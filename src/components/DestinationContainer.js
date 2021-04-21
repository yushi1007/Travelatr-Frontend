import React, { useState, useEffect } from "react";
import DestinationCard from "./DestinationCard";
import Search from "./Search";
import aerial from "../images/aerial.jpeg"

const DestinationContainer = ({ destinations, setDestinations, likes, setLikes}) => {
/*        USE STATE        */
    
    const [searchText, setSearchText] = useState("")
    const [checkBox, setCheckBox] = useState(false)
    const [sort, setSort] = useState("popularity")

/*        FETCH DESTINATIONS INFO        */
    useEffect(() => {
        fetch("http://localhost:7000/destinations")
        .then(r => r.json())
        .then(destinations => setDestinations(destinations))
    }, [likes])

/*       HANDLE SEARCH DESTINATIONS BY NAME       */
    const handleSearchText = (event) => {
        setSearchText(event.target.value)
    }

/*       HANDLE CHECK BOX TO SEE DOMESTIC DESTINATIONS        */
    const handleCheckBox = () => {
        setCheckBox(checkBox => !checkBox)
    }

/*        HANDLE SORT BY POPULARITY AND NAME        */
    const handleSort = (event) => {
        setSort(event.target.value)
    }

/*        SEARCH BY TYPE IN LOWERCASE OR UPPERCASE        */    
    const searchedDestinations = destinations.filter((destination) => destination.name.toLowerCase().includes(searchText.toLowerCase()))

    const destinationsToDisplay = [...searchedDestinations]
/*        CHECK BOX TO SEE DOMESTIC DESTINATIONS        */
    .filter((destination) => {
        if (checkBox) {
            return !destination.us
        } else {
            return destination
        }
        })
/*        SORT BY POPULARITY AND NAME        */
    .sort((a, b) => {
        if (sort === "name") {
            return a.name.localeCompare(b.name)
        } else {
            return 0
        }
    })

/*        LIST OF THE DESTINATIONS        */
    const destinationCards = destinationsToDisplay.map((destination) => {
        return <DestinationCard 
                    key={destination.id}    
                    destination={destination}
                    likes={likes}
                    setLikes={setLikes}
               />
    })

    
    return (
    <>
        <div className="destination-container">
            <h1>PLAN YOUR ESCAPE</h1>
            <Search 
            searchText={searchText} 
            onSearch={handleSearchText} 
            checkBox={checkBox} 
            onCheckBox={handleCheckBox}
            sort={sort}
            onSort={handleSort}
            />
            <img id="landscape-img" src={aerial} alt="landscape"/>
        </div>
        <div className="destination">
            {destinationCards}
        </div>
    </>
    )
}

export default DestinationContainer;