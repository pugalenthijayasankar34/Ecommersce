import React, { useState } from "react";

function Header({ cart, setShowCart, search, setSearch, handleLogout }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [popup, setPopup] = useState("");

  return (
    <>
      <div className="header">
        <h1>Cars Store Room</h1>

        <div className="header-menu">
          <button className="home-btn">Home</button>

          <div className="dropdown">
            <button
              className="profile-btn"
              onClick={() => setShowAdmin(!showAdmin)}
            >
              👤
            </button>

            {showAdmin && (
              <div className="dropdown-content">
                <button onClick={() => setPopup("profile")}>
                  👤 My Profile
                </button>

                <button onClick={() => setPopup("orders")}>📦 Orders</button>

                <button onClick={() => setPopup("users")}>👥 Users</button>

                <button onClick={() => setPopup("products")}>
                  🛒 Products
                </button>

                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="cart-btn" onClick={() => setShowCart(true)}>
            Cart ({cart.length})
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
