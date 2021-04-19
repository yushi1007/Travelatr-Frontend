import React from "react";
import { Link } from "react-router-dom";
// import logouticon from '../images/logout.png'
// import loggedinicon from '../images/login.png'

function NavBar({ user, setUser }) {

    const logout = () => {

        localStorage.removeItem("token")
    
        setUser(null);
      }

    return (
        <div>
          <div className="navbar">
            <div className="home">
                <Link to="/" id="logo"><i className="fas fa-map-marked-alt"></i>TRAVELATR</Link>
                <Link to="/" className="home-text">Home</Link>
            </div>
            <div>
                {user ? (
            <>
                <Link to="/destination-list" className="destination-btn">Destinations</Link>
                <Link to="/profile" className="favorite">My Favorite</Link>
                <Link to="/profile" className="profile"><i className="far fa-user-circle"/></Link>
                <Link to="/"onClick={logout} className="logout-btn">Logout</Link>
            </>
                ) : (
            <>
                <Link to="/login" className="loginicon">Sign In</Link>
                <Link to="/signup" className="loggedinicon">Sign Up</Link>
            </>
                )}
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