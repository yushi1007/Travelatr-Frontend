import React, { useEffect, useState } from "react";
import '../App.css';
import NavBar from "./NavBar";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
// import Login from "./Login";
import Profile from "./Profile"
import Home from "./Home";
import DestinationDetails from "./DestinationDetails";
import DestinationContainer from "./DestinationContainer";

function App() {
  const [user, setUser] = useState(null)
  const [destinations, setDestinations] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [favoriteList, setFavoriteList] = useState(null)
  

  /*        FETCH DESTINATIONS INFO        */
  useEffect(() => {
    fetch("http://localhost:7000/destinations")
    .then(r => r.json())
    .then(destinations => {
      setDestinations(destinations)
      setIsLoaded(true)
    })
}, [])

  useEffect(() => {
    // GET /me
    const token = localStorage.getItem("token");
    fetch("http://localhost:7000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) {
            return data;
          } else {
            throw data;
          }
        });
      })
      .then((signedInUser) => {
        setUser(signedInUser);
        console.log(signedInUser.favorites, "user's favs")
        setFavoriteList(signedInUser.favorites)
        setIsLoaded(true)
      });
  }, []);
   

  function handleAddFavorite(favoriteToAdd) {
    setFavoriteList([...favoriteList, favoriteToAdd])
    console.log(favoriteToAdd, "new favorite")
  }

  function handleDeleteFavorite(favoriteToRemove) {
    const newFavoriteList = favoriteList.filter((fav) => fav.id !== favoriteToRemove.id)
    setFavoriteList(newFavoriteList)
  }
console.log(process.env.REACT_APP_SKY_KEY, "api_key")
  console.log(favoriteList, "fav list")
  
  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/">
            <Home setUser={setUser} />
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} handleAddFavorite={handleAddFavorite} 
            handleDeleteFavorite={handleDeleteFavorite}
            favoriteList={favoriteList} isLoaded={isLoaded} />
          </Route>
          <Route exact path="/destination-list">
            <DestinationContainer destinations={destinations} isLoaded={isLoaded} handleAddFavorite={handleAddFavorite} />
          </Route>
          <Route exact path="/destination/:id">
            <DestinationDetails user={user} handleAddFavorite={handleAddFavorite} favoriteList={favoriteList}/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
