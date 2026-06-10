import React, { useState } from "react";
import CartIcon from "@iconify-react/mdi-light/cart";
import { useNavigate } from "react-router-dom";
import ProfileThinIcon from "@iconify-react/iconamoon/profile-thin";
import SearchIcon from "@iconify-react/material-symbols-light/search";
import LogoutIcon from "@iconify-react/mdi-light/logout";

function Header({ cart, search, setSearch, handleLogout }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [popup, setPopup] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        {/* LOGO */}
        <h1 className="logo">Cars Store Room</h1>

        {/* SEARCH */}
        <div className="search-container">
          <span className="search-icon">
            <SearchIcon height="1.5em" />
          </span>

          <input
            className="search-input"
            type="text"
            placeholder="Search for Products, Brands and More"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="header-right">
          <div className="dropdown">
            <button
              className="profile-btn"
              onClick={() => setShowAdmin(!showAdmin)}
            >
              <ProfileThinIcon height="1em" />
            </button>

            {showAdmin && (
              <div className="dropdown-content">
                <button onClick={() => setPopup("profile")}>
                  <ProfileThinIcon height="1em" />
                  My Profile
                </button>

                <button onClick={() => setPopup("orders")}>📦 Orders</button>

                <button onClick={() => setPopup("users")}>👥 Users</button>

                <button onClick={() => setPopup("products")}>
                  🛒 Products
                </button>

                <button onClick={handleLogout}>
                  <LogoutIcon height="1em" />
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="cart-btn" onClick={() => navigate("/cart")}>
            <CartIcon height="24" />
            <span>({cart.length})</span>
          </button>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {popup === "profile" && (
              <>
                <h2>👤 My Profile</h2>
                <p>Name : Admin User</p>
                <p>Email : admin@gmail.com</p>
                <p>Role : Admin</p>
              </>
            )}

            {popup === "orders" && (
              <>
                <h2>📦 Orders</h2>
                <p>Total Orders : 12</p>
                <p>Pending Orders : 2</p>
              </>
            )}

            {popup === "users" && (
              <>
                <h2>👥 Users</h2>
                <p>Total Users : 150</p>
              </>
            )}

            {popup === "products" && (
              <>
                <h2>🛒 Products</h2>
                <p>Total Products : 50</p>
              </>
            )}

            <button className="close-btn" onClick={() => setPopup("")}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;