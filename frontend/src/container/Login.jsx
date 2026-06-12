import React, { useState } from "react";
import axios from "axios";
import Loginimage from "../image/Login.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      console.log(response.data, "LOGIN SUCCESS");

      localStorage.setItem(
        "token",
        response.data.accessToken || response.data.token,
      );

      dispatch(
        loginUser({
          username,
          password,
        }),
      );

      navigate("/home");
    } catch (error) {
      console.log(error);

      setError("Invalid Username or Password");

      alert("Invalid Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT SIDE */}

        <div className="login-left">
          <h1>
            Hello,
            <br />
            Welcome Back
          </h1>

          <p>Login to continue</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">{loading ? "Loading..." : "Sign In"}</button>
          </form>

          <div className="demo-login">
            <p>
              <b>Username :</b> emilys
            </p>

            <p>
              <b>Password :</b> emilyspass
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="login-right">
          <img src={Loginimage} alt="login" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
