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
  const [viewPassword, setViewPassword] = useState(false);
  const [fullname, setFullName] = useState("");
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

  const [disabled, setDisabled] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const { data } = await axios.post(`${SERVER_URL}/auth/signup`, {
        email,
        password,
        fullname: fullname,
      });
      localStorage.setItem("accessToken", data.token.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEmail("");
      setPassword("");
      setFullName("");
      setLoggedInUser(data.user);
    } catch (err) {
      console.log(err);
    }
    setDisabled(false);
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <input
          type="text"
          name="fullname"
          className="input-tag"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          required
        />
        <button className="btn" type="submit" disabled={disabled}>
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span
          onClick={() => {
            navigate("/login", {
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
          Login
        </span>
      </p>
    </div>
  );
};

export default Login;
