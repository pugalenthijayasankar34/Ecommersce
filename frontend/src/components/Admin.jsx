import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import CustomButton from "../customcomponent/button/CustomButton";

export default function Admin() {
  const navigate = useNavigate();

  const cart = [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Header
        cart={cart}
        handleLogout={handleLogout}
        search=""
        setSearch={() => {}}
        goToCart={() => navigate("/cart")}
      />

      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <h2 className="sidebar-title">Admin Panel</h2>

          <CustomButton
            className="sidebar-btn"
            onClick={() => navigate("/home")}
          >
            Home
          </CustomButton>

          <CustomButton
            className="sidebar-btn"
            onClick={() => navigate("/admin/add-product")}
          >
            Add Product
          </CustomButton>

          <CustomButton
            className="sidebar-btn"
            onClick={() => navigate("/admin/manage-products")}
          >
            Manage Products
          </CustomButton>

          <CustomButton
            className="sidebar-btn"
            onClick={() => navigate("/admin/orders")}
          >
            Orders
          </CustomButton>

          <CustomButton className="sidebar-btn"> Users</CustomButton>

          <CustomButton className="sidebar-btn"> Settings</CustomButton>
        </div>

        {/* Dashboard */}
        <div className="admin-content">
          <h1 className="dashboard-heading">Dashboard</h1>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h5>Products</h5>
              <h2>120</h2>
            </div>

            <div className="dashboard-card">
              <h5>Orders</h5>
              <h2>85</h2>
            </div>

            <div className="dashboard-card">
              <h5>Users</h5>
              <h2>45</h2>
            </div>

            <div className="dashboard-card">
              <h5>Revenue</h5>
              <h2>₹25,000</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
