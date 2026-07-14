import React, { useState } from "react";
import CartIcon from "@iconify-react/mdi-light/cart";
import { useNavigate } from "react-router-dom";
import ProfileThinIcon from "@iconify-react/iconamoon/profile-thin";
import SearchIcon from "@iconify-react/material-symbols-light/search";
import LogoutIcon from "@iconify-react/mdi-light/logout";
import AddRoundedIcon from "@iconify-react/material-symbols/add-rounded";

function Header({
  cart = [],
  search = "",
  setSearch = () => {},
  handleLogout,
  goToCart,
}) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [popup, setPopup] = useState("");

  const navigate = useNavigate();
const role = localStorage.getItem("role");
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
          {/* HOME */}
          {role === "admin" && (
            <button
              className="add-product-btn"
              onClick={() => navigate("/admin")}
            >
              <AddRoundedIcon height="2em" />
            </button>
          )}

          {/* PROFILE */}
          <div className="dropdown">
            <button
              className="profile-btn"
              onClick={() => setShowAdmin(!showAdmin)}
            >
              <ProfileThinIcon height="1em" />
            </button>

            {showAdmin && (
              <div className="dropdown-content">
                <button onClick={() => navigate("/admin")}>
                  <ProfileThinIcon height="1em" />
                  My Profile
                </button>

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

          {/* CART */}
          <button className="cart-btn" onClick={goToCart}>
            <CartIcon height="24" />
            <span>({cart.length})</span>
          </button>
        </div>
      </div>

      {/* POPUPS */}
      {popup === "orders" && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>📦 Orders</h2>
            <p>Total Orders: 12</p>
            <button onClick={() => setPopup("")}>Close</button>
          </div>
        </div>
      )}

      {popup === "users" && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>👥 Users</h2>
            <p>Total Users: 150</p>
            <button onClick={() => setPopup("")}>Close</button>
          </div>
        </div>
      )}

      {popup === "products" && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🛒 Products</h2>
            <p>Total Products Available</p>
            <button onClick={() => setPopup("")}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
