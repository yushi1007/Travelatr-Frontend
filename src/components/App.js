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
      .then((user) => {
        // response => set user in state
        setUser(user);
      });
  }, []);
//  console.log(user.id)
  function handleAddFavorite(favoriteToAdd) {
    setFavoriteList([...favoriteList, favoriteToAdd])
    console.log(favoriteToAdd, "new favorite")
  }
  console.log(favoriteList)
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
          {/* <Route exact path="/login">
            <Login setUser={setUser} />
          </Route> */}
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} handleAddFavorite={handleAddFavorite} favoriteList={favoriteList} setFavoriteList={setFavoriteList}/>
          </Route>
          <Route exact path="/destination-list">
            <DestinationContainer destinations={destinations} isLoaded={isLoaded}  />
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
