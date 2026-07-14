import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./container/Login";
import Admin from "./components/Admin";
import Home from "./container/Home";
import CartPage from "./container/CartPage";
import Orders from "./components/Orders";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import ManageProducts from "./components/ManageProduct";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
