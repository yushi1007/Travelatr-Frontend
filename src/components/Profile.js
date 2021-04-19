import React, {useState} from "react";
import FavoriteList from "./FavoriteList";

const Profile = ({user, setUser}) => {

    const [formData, setFormData] = useState({
        // pre fill the form with current user info
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        location: user.location,
        password: user.password,
      });
    
      function handleChange(e) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        // TODO: update the user's profile
            const token = localStorage.getItem("token");
            fetch("http://localhost:3000/me", {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })
              .then(r => r.json())
              .then(userProfile => {
                setUser(userProfile);
              });
      }

const { first_name, last_name, location, username, password } = formData;
    return(
    <div className="profile-form" onSubmit={handleSubmit} >
        <form>
            <h1>{user.username}'s Profile</h1>

            <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                />

                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                />

                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            <input type="submit" value="Update" />
        </form>
        <FavoriteList />
    </div>
    )
}

export default Profile;