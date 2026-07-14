import React, { useEffect, useState } from "react";
import { supabase } from "../services/Supabase";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (*)
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data);
  }

  return (
    <div className="container mt-4">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "90px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back
        </button>

        <h2 style={{ margin: 0 }}>My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <details key={order.id} className="card p-3 mb-3">
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Order ID: {order.id.slice(0, 8)}
              {" | "}
              {new Date(order.created_at).toLocaleString()}
            </summary>

            <br />

            <p>
              <strong>Total:</strong> ₹{order.total_amount}
            </p>

            <h5>Products</h5>

            {order.order_items?.map((item) => (
              <div key={item.id} className="border-bottom pb-2 mb-2">
                <p>
                  <strong>Product:</strong> {item.product_title}
                </p>

                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>

                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>
              </div>
            ))}
          </details>
        ))
      )}
    </div>
  );
}
