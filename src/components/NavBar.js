import React from "react";
import { Link } from "react-router-dom";
// import logouticon from '../images/logout.png'
// import loggedinicon from '../images/login.png'

function NavBar() {

    return (
        <div>
          <div className="navbar">
            <div className="home">
                <Link to="/" id="logo">TRAVELATR</Link>
                <Link to="/" className="home-text">Home</Link>
            </div>
            <div>
                <Link to="/login" className="loginicon">Sign In</Link>
                <Link to="/signup" className="loggedinicon">Sign Up</Link>
                <Link to="/profile" className="profile">Profile</Link>
                <Link to="/profile" className="favorite">My Favorite</Link>
                <button className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      );
    }

export default NavBar;

                    /* <img 
                    alt="login button"
                    src={loggedinicon} 
                    className="loggedinicon" /> */

                    // <img 
                    // alt="logout"
                    // src={logouticon} 
                    // className="loginicon"/>
                    // <button>Logout</button>