import React, { useContext, useEffect, useState } from "react";
import "../styles/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config/config.jsx";
import { MyContext } from "../context/context.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${SERVER_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setLoggedInUser(data.user);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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

        <Link to="#" className="forgot-password">
          Forgot password?
        </Link>

        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
