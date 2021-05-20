import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setUser, isShowLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([])
  const history = useHistory()
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:7000/login", {
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
        console.log(error, "login error")
        if (error) {
        setErrors(error.errors);
        }
      });
  }

  return (
<div className={`${isShowLogin ? "active" : ""} show`}>
  <div className="login-form">
      <div className="formbox center">
        <form onSubmit={handleSubmit}>
          <div className="icon center">
              <i className="far fa-user fa-2x"></i>
          </div>
          <h1>Sign In</h1>
          <div>
            <label>Username</label><br/>
            <input
              type="text"
              name="username"
              id=""
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
            /><br></br>
          </div>
          <div>
            <label>Password</label><br/>
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            /><br></br>
          </div>
          {errors.map(error => 
          <p style={{ color: "red"}} key={error}>
            {error}
          </p>
          )}
          <button type="submit" className="btn">LOGIN</button>
        </form>
      </div>
  </div>
</div>
  );
}

export default Login;