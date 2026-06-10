import { useEffect, useState } from "react";

import Header from "../components/Header";

import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div>
      <Header
        cart={cart}
        handleLogout={handleLogout}
        search=""
        setSearch={() => {}}
        goToCart={() => navigate("/cart")}
      />

      <div className="cart-container">
        <h1>My Cart</h1>

        {cart.length === 0 ? (
          <h2>No Products Added</h2>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.title} />

              <div>
                <h3>{item.title}</h3>

                <p>₹{item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CartPage;
