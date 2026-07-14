import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/Supabase";

function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Total Amount
  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price),
    0,
  );

  // Place Order
  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login");
      return;
    }

    // Save Order
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          total_amount: totalAmount,
          status: "Pending",
        },
      ])
      .select();

    if (orderError) {
      console.log(orderError);
      alert("Order Failed");
      return;
    }

    // Save Order Items
    const items = cart.map((item) => ({
      order_id: orderData[0].id,
      product_title: item.title,
      quantity: 1,
      price: item.price,
    }));

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemError) {
      console.log(itemError);
      alert("Order Items Save Failed");
      return;
    }

    alert("Order Placed Successfully!");

    localStorage.removeItem("cart");
    setCart([]);

    navigate("/orders");
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

      <div className="back-container">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ← Back
        </button>
      </div>

      <div className="cart-container">
        <h1>My Cart</h1>

        {cart.length === 0 ? (
          <h2>No Products Added</h2>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

            <hr />

            <h2>Total: ₹{totalAmount}</h2>

            <button
              onClick={placeOrder}
              style={{
                padding: "12px 25px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                marginTop: "20px",
              }}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
