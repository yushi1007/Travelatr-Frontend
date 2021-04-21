import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function SignUp({ setUser }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    location: "",
    password: "",
  });

  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:7000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
      .then((data) => {
        const { user, token } = data;
        localStorage.setItem("token", token);
        setUser(user);
        history.push("/destination-list");
      })
      .catch((error) => {
        setErrors(error.errors);
      });
  }

  const { first_name, last_name, location, username, password } = formData;

  return (
    <div className="signup-form">
        <div className="form-box">
            <form onSubmit={handleSubmit}>
                <h1 id="signup-text">Sign Up</h1><br></br>

                <label>First Name</label><br></br>
                <input
                    type="text"
                    name="first_name"
                    className="signup-box"
                    value={first_name}
                    onChange={handleChange}
                /><br></br>

                <label>Last Name</label><br></br>
                <input
                    type="text"
                    name="last_name"
                    className="signup-box"
                    value={last_name}
                    onChange={handleChange}
                /><br></br>

                <label>Location</label><br></br>
                <input
                    type="text"
                    name="location"
                    className="signup-box"
                    value={location}
                    onChange={handleChange}
                /><br></br>

                <label>Username</label><br></br>
                <input
                    type="text"
                    name="username"
                    className="signup-box"
                    value={username}
                    onChange={handleChange}
                /><br></br>

                <label>Password</label><br></br>
                <input
                    type="password"
                    name="password"
                    className="signup-box"
                    value={password}
                    onChange={handleChange}
                /><br></br>

                    {errors.map(error => 
                    <p style={{ color: "red"}} key={error}>
                    {error}
                    </p>
                    )}

                <input type="submit" value="SIGN UP" className="signup-btn" />
            </form>
        </div>
    </div>
  );
}

export default SignUp;