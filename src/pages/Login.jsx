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

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const [viewPassword, setViewPassword] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const { data } = await axios.post(`${SERVER_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEmail("");
      setPassword("");
      setLoggedInUser(data.user);
    } catch (err) {
      console.log(err);
    }
    setDisabled(false);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          className="input-tag"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={viewPassword ? "text" : "password"}
            name="password"
            className="input-tag w-100"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="toggle-password">
            {viewPassword ? (
              <i
                className="ri-eye-fill"
                onMouseLeave={() => {
                  setViewPassword(!viewPassword);
                }}
                onClick={() => {
                  setViewPassword(false);
                }}
              />
            ) : (
              <i
                className="ri-eye-off-fill"
                onMouseEnter={() => {
                  setViewPassword(!viewPassword);
                }}
                onClick={() => {
                  setViewPassword(true);
                }}
              />
            )}
          </div>
        </div>

        <Link to="/forgotpassword" className="forgot-password">
          Forgot password?
        </Link>

        <button className="btn" type="submit" disabled={disabled}>
          Login
        </button>
      </form>
      <p>
        Don't have an account?
        <span
          onClick={() => {
            navigate("/register", {
              state: { from: location.state && location.state.from },
            });
          }}
          style={{
            cursor: "pointer",
            color: "#007bff",
            marginLeft: "5px",
            textDecoration: "underline",
          }}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
