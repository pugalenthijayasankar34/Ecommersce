import React, { useState } from "react";
import Loginimage from "../image/Login.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../features/auth/authSlice";
import { supabase } from "../services/supabase";

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
      // Supabase Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log(data, "LOGIN SUCCESS");

      // Save Token
      localStorage.setItem("token", data.session.access_token);

      // Save User
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redux Save
      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email,
        }),
      );

      // Get User Role
      const { data: roleData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (roleError) {
        console.log(roleError);
      }

    
      // Navigate Based On Role
      if (roleData?.role === "admin") {
        navigate("/admin");
      } else {
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

        {/* RIGHT SIDE */}
        <div className="login-right">
          <img src={Loginimage} alt="login" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
