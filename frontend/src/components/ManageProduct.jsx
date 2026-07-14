import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const cart = [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleEdit = (item) => {
    navigate("/add-product", {
      state: {
        product: item,
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
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

      <div className="manage-products-container">
        <h2 className="manage-products-title">Manage Products</h2>

        {products.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          products.map((item) => (
            <div key={item.id} className="manage-product-card">
              <div className="manage-product-row">
                <div className="manage-product-image-section">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="manage-product-image"
                  />
                </div>

                <div className="manage-product-details">
                  <h3>{item.title}</h3>

                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>

                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>

                  <p>
                    <strong>Stock:</strong> {item.stock}
                  </p>
                </div>

                <div className="manage-product-actions">
                  <button
                    className="manage-edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="manage-delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ManageProduct;
