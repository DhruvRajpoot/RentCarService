import React, { useContext, useEffect, useState } from "react";
import "../styles/register.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config/config.jsx";
import { MyContext } from "../context/context.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(MyContext);

  useEffect(() => {
    if (loggedInUser) {
      if (location.state && location.state.from) {
        navigate(location.state.from);
      } else {
        navigate("/home");
      }
    }
  }, [loggedInUser]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${SERVER_URL}/auth/signup`, {
      email,
      password,
      fullname: `${firstName} ${lastName}`,
    });
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setLoggedInUser(data.user);
    navigate("/home");
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          required
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Login;
