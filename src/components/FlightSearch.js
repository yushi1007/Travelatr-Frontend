import React, { useState } from "react";

const FlightSearch = ({ name, toggleSearch }) => {
    const [carriers, setCarriers] = useState([])
    const [places, setPlaces] = useState([])
    const [quotes, setQuotes] = useState([])
    const [formData, setFormData] = useState({
        country: "",
        currency: "",
        destination: "",
        outbound: "",
        origin: "",
        inbound: "",
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    const fetchUrl = () => { 
        if (formData.inbound === "") {
            return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${formData.country}/${formData.currency}/en-US/${formData.origin}-sky/${formData.destination}-sky/${formData.outbound}`
        } else {
            return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${formData.country}/${formData.currency}/en-US/${formData.origin}-sky/${formData.destination}-sky/${formData.outbound}?inboundpartialdate=${formData.inbound}`
        }
    }

    const renderResult = (response) => {
        const carrierItems = response.Carriers.map((c) => 
            
                <table key={c.Name}>
                    <tr> 
                        <th>Carrier Id</th>
                        <th>Airline</th>
                    </tr>
                    <tr>
                        <td>{c.CarrierId}</td>
                        <td>{c.Name}</td>
                    </tr>
                </table>
           
        )
        setCarriers(carrierItems)
        const placeItems = response.Places.map((p) => 
                <table key={p.Name}>
                    <tr> 
                        <th>Airport</th>
                        <th>Location</th>
                        <th>Airport code</th>
                        <th>Place Id</th>
                    </tr>
                    <tr>
                        <td>{p.Name}</td>
                        <td>{p.CityName} - {p.CountryName}</td>
                        <td>{p.SkyscannerCode}</td>
                        <td>{p.PlaceId}</td>
                    </tr>
                </table>
        )
        setPlaces(placeItems)
        const quotesItems = response.Quotes.map((q) => 
                <table key={q.QuoteId}>
                    <tr> 
                        <th>Flight type</th>
                        <th>Minimum Price</th>
                        <th>Carrier Id</th>
                        <th>Departure date</th>
                        <th>Quote date</th>
                    </tr>
                    <tr>
                        <td>{q.Direct ? "Direct" : "Indirect"}</td>
                        <td>$ {q.MinPrice}</td>
                        <td>{q.OutboundLeg.CarrierIds}</td>
                        <td>{q.OutboundLeg.DepartureDate}</td>
                        <td>{q.QuoteDateTime}</td>
                    </tr>
                </table>
        )
        setQuotes(quotesItems)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(fetchUrl(), {
        "method": "GET",
        "headers": {
		"x-rapidapi-key": `${process.env.REACT_APP_SKY_KEY}`,
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
        })
        .then(response => response.json())
        .then(response => {
            // debugger
            renderResult(response)
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    return(
<div>
    <div className="flight-search-form">
        <div className="search-box">
            <form onSubmit={handleSubmit}>
            <h3 id="flight-text">Search for flight to {name}</h3>
                <label>Country:</label>
                <input className="search-input" type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country you're currently in..." />
                <label>Currency:</label>
                <input className="search-input" type="text" name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency for flight results..." />
                <label>Destination:</label>
                <input className="search-input" type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination airport code..." />
                <label>Outbound Date:</label>
                <input className="search-input" type="text" name="outbound" value={formData.outbound} onChange={handleChange} placeholder="Outbound date yyyy-mm-dd, or 'anytime'..." />
                <label>Origin:</label>
                <input className="search-input" type="text" name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin airport code..." />
                <label>Inbound Date:</label>
                <input className="search-input" type="text" name="inbound" value={formData.inbound} onChange={handleChange} placeholder="Inbound date yyyy-mm-dd, or 'anytime' (leave blank if one way 😉)..." />
                <button type="submit" className="flight-search-button">Search</button>
            </form>
            </div>
        </div>
        <div className="flight-info">
            {carriers}
            {places}
            {quotes}
        </div>
</div>
    )
}
// Update
export default FlightSearch;

