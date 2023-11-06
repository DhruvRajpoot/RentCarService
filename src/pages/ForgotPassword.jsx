import React, { useEffect, useState } from "react";
import "../styles/forgot-password.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config/config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [otpsent, setOtpSent] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/auth/sendresetcode/forgotpassword`,
        {
          email,
        }
      );
      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (err) {
      console.log(err);
    }
    setDisabled(false);
  };

  // Set new password
  const handleSetPassword = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post(`${SERVER_URL}/auth/forgotpassword`, {
        email,
        resetCode: otp,
        password: newPassword,
      });
      if (response.status === 200) {
        console.log("Password reset successful");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
    setDisabled(false);
  };

  return (
    <div className="forgot-container">
      <h1>Reset Password</h1>
      {!otpsent ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            name="email"
            className="input-tag"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn" type="submit" disabled={disabled}>
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleSetPassword}>
          <div className="password-container">
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              className="input-tag w-100"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            type="number"
            name="otp"
            className="input-tag"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="btn" type="submit" disabled={disabled}>
            Set Password
          </button>
        </form>
      )}
      <Link to="/login" className="back-to-login">
        <span>
          <i class="ri-arrow-left-fill"></i>
        </span>
        Back to login
      </Link>
    </div>
  );
};

export default ForgotPassword;
