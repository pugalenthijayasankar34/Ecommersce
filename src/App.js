import React from "react";
import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./container/Login";
import Home from "./container/Home";
import CartPage from "./container/CartPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
