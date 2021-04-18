import React from "react";
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
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
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
