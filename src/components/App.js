import React, { useEffect, useState } from "react";
import '../App.css';
import NavBar from "./NavBar";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile"
import Home from "./Home";
import DestinationDetails from "./DestinationDetails";
import DestinationContainer from "./DestinationContainer";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // GET /me
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/me", {
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

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route exact path="/destination-list">
            <DestinationContainer />
          </Route>
          <Route exact path="/destination/:id">
            <DestinationDetails/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
