import React from "react";
import background from "../images/background.jpeg";

const Home = () => {
    return(
        <div className="home-page">
            <h3>To travel is to live</h3>
            <h1>Your Journey Begins</h1>
            <img id="background-img" src={background} alt="background"/>
        </div>
    )
}

export default Home;