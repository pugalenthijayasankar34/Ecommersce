import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../container/Home";
import Login from "../container/Login";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
