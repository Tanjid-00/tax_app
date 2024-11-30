import React, { useState } from "react";
import style from "../styles/form.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Images/logo.png";

const Register = () => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    // Debug: Log the data being sent to the backend
    console.log("Data Sent to Backend:", values);

    axios
      .post("http://localhost:8080/authRoutes/register", values)
      .then((res) => {
        // Check if the registration was successful
        if (
          res.status === 201 &&
          res.data.Status === "User registered successfully."
        ) {
          navigate("/login"); // If successful, navigate to login
        } else {
          setErrorMessage("Registration failed! Please try again.");
        }
      })
      .catch((err) => {
        // Handle errors from the backend
        if (err.response?.status === 409) {
          setErrorMessage("Email already exists.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
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
              id="name"
              type="text"
              name="name"
              value={values.userName}
              onChange={(e) =>
                setValues({ ...values, userName: e.target.value })
              }
              required
              autoComplete="name"
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            EMAIL
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
              autoComplete="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            PASSWORD
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
          </label>
        </div>
        {errorMessage && <p className={style.error}>{errorMessage}</p>}
        <button type="submit">Sign up</button>
        <span>
          Already have an account? <br />
          <Link to={"/login"}>Log in</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
