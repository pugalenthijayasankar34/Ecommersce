import React, { useState } from "react";
import Loginimage from "../image/Login.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../features/auth/AuthSlice";
import { supabase } from "../services/Supabase";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log(data, "LOGIN SUCCESS");

      localStorage.setItem("token", data.session.access_token);

      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email,
        }),
      );

      // Login success → Direct Admin Page
      // Check User Role
      if (data.user.email === "admin@gmail.com") {
        localStorage.setItem("role", "admin");
        navigate("/home");
      } else {
        localStorage.setItem("role", "user");
        navigate("/home");
      } 
    } catch (error) {
      console.log(error);

      setError(error.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <h1>
            Hello,
            <br />
            Welcome Back
          </h1>

          <p>Login to continue</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="login-right">
          <img src={Loginimage} alt="login" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
