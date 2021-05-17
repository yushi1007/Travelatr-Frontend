import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import sign_up_page_img from "../images/JakobOwens-img.jpeg";

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
        history.push("/");
        setTimeout(function(){
          window.location.reload()
        }, 0)
      })
      .catch((error) => {
        setErrors(error.errors);
      });
  }

  const { first_name, last_name, location, username, password } = formData;

  return (
    <div className="signup-form">
        <div className="form-box center">
            <form onSubmit={handleSubmit}>
            <div className="icon center">
              <i className="far fa-user fa-2x"></i>
            </div>
                <h1>Sign Up</h1><br></br>
                <div>
                    <label>First Name</label><br></br>
                    <input
                        type="text"
                        name="first_name"
                        id=""
                        placeholder="Enter first name"
                        value={first_name}
                        onChange={handleChange}
                    /><br></br>
                </div>
                <div>
                    <label>Last Name</label><br></br>
                    <input
                        type="text"
                        name="last_name"
                        id=""
                        placeholder="Enter last name"
                        value={last_name}
                        onChange={handleChange}
                    /><br></br>
                </div>
                <div>
                    <label>Location</label><br></br>
                    <input
                        type="text"
                        name="location"
                        id=""
                        placeholder="Enter location"
                        value={location}
                        onChange={handleChange}
                    /><br></br>
                </div>
                <div>
                    <label>Username</label><br></br>
                    <input
                        type="text"
                        name="username"
                        id=""
                        placeholder="Enter username"
                        value={username}
                        onChange={handleChange}
                    /><br></br>
                </div>
                <div>
                    <label>Password</label><br></br>
                    <input
                        type="password"
                        name="password"
                        id=""
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChange}
                    /><br></br>
                </div>
                    {errors.map(error => 
                    <p style={{ color: "red"}} key={error}>
                    {error}
                    </p>
                    )}

                <button type="submit" className="btn">SIGN UP</button> 
            </form>
        </div>
        <img id="background-img" src={sign_up_page_img} alt="background-img"/>
    </div>
  );
}

export default SignUp;