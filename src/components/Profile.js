import React, {useState, useEffect} from "react";
import FavoriteList from "./FavoriteList";

const Profile = ({user, setUser, handleAddFavorite, favoriteList, isLoaded}) => {
    console.log(user)
    
   console.log(favoriteList, "fav list profile")

    // const handleFetchFav = () => {
    //     fetch(`http://localhost:7000/users/${user.id}`)
    //     .then(r => r.json())
    //     .then((user) => {
    //         console.log(user.favorites)
    //         setFavoriteList(user.favorites)
    //         setIsLoaded(true)
    //     })

    // }

    
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
            fetch("http://localhost:7000/me", {
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
    <>
    <div className="profile-form" onSubmit={handleSubmit} >
        <form>
            <h1>{user.username}'s Profile</h1>
            <label>First Name</label><br></br>
                <input
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                /><br></br>

                <label>Last Name</label><br></br>
                <input
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                /><br></br>

                <label>Location</label><br></br>
                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                /><br></br>

                <label>Username</label><br></br>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                /><br></br>

                <label>Password</label><br></br>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                /><br></br>
            <input type="submit" value="Update" />
        </form>
        </div>
        <div className="favorite-list">
            <FavoriteList handleAddFavorite={handleAddFavorite} favoriteList={favoriteList} isLoaded={isLoaded} />
        </div>
    </>
    )
}

export default Profile;