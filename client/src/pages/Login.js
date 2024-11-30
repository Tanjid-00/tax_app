import React, { useState } from "react";
import style from "../styles/form.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Images/logo.png";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth hook

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error state
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:8080/authRoutes/login",
        {
          userName,
          password,
        }
      );

      if (
        response.status === 200 &&
        response.data.Status === "Login successful"
      ) {
        // On success, call login function from AuthContext
        login(response.data.Token); // Pass the token received from the backend
        navigate("/"); // Redirect to homepage
      } else {
        setErrorMessage("Login failed! Please try again.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={style.formPage}>
      <Link to={"/"}>
        <img className={style.logo} src={logo} alt="logo" />
      </Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            NAME
            <input
              type="text"
              id="name"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            PASSWORD
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage && <p className={style.error}>{errorMessage}</p>}
        <button type="submit">Log in</button>
        <span>
          don't have an account? <br />
          <Link to={"/register"}>Create Account</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
