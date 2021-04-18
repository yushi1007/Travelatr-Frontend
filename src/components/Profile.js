import React from "react";
import FavoriteList from "./FavoriteList";

const Profile = () => {

    return(
    <div className="profile-form">
        <form>
            <h1>My Profile</h1>

            <label>First Name</label>
            <input
                type="text"
                name="first_name"
            />

            <label>Last Name</label>
            <input
                type="text"
                name="last_name"
            />

            <label>Location</label>
            <input
                type="text"
                name="location"
            />

            <label>Username</label>
            <input
                type="text"
                name="username"
            />

            <label>Password</label>
            <input
                type="password"
                name="password"
            />
            <input type="submit" value="Update" />
        </form>
        <FavoriteList />
    </div>
    )
}

export default Profile;