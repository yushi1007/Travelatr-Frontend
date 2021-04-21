import React from "react";
import background from "../images/background.jpeg";

const Home = () => {
    return(
        <div className="home-page">
            <img id="background-img" src={background} alt="background"/>
        </div>
    )
}

export default Home;