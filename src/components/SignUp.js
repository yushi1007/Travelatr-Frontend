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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>

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

                    {errors.map(error => 
                    <p style={{ color: "red"}} key={error}>
                    {error}
                    </p>
                    )}

                <input type="submit" value="Signup" />
            </form>
        </div>
    </div>
  );
}

export default SignUp;