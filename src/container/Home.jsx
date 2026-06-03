import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

import LoaderIcon from "@iconify-react/codex/loader";

import { getProducts, getsingleProduct } from "../services/ProductService";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");

    console.log("REMOVE");

    navigate("/");
  };

  /* GET ALL PRODUCTS */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const data = await getProducts();

      console.log(data, "ALL PRODUCTS");

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* SINGLE PRODUCT */

  const showDetails = async (id) => {
    setLoading(true);

    try {
      const data = await getsingleProduct(id);

      console.log(data, "SINGLE PRODUCT");

      console.log(`https://fakestoreapi.com/products/${id}`);

      setSelectedProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* ADD TO CART */

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);

    console.log(product, "ADDED TO CART");
  };

  return (
    <div>
      {/* HEADER */}

      <Header cart={cart} setShowCart={setShowCart} handleLogout={handleLogout} />

      {/* LOADING */}

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <LoaderIcon height="6em" />

          <h2>Loading Product...</h2>
        </div>
      ) : (
        <div className="product-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              showDetails={showDetails}
            />
          ))}
        </div>
      )}

      {/* PRODUCT DETAILS */}

      {selectedProduct && (
        <div className="details-box">
          <img src={selectedProduct.image} alt={selectedProduct.title} />

          <h2>{selectedProduct.title}</h2>

          <h3>₹{selectedProduct.price}</h3>

          <p>{selectedProduct.description}</p>

          <h4>Category : {selectedProduct.category}</h4>

          <button
            className="close-btn"
            onClick={() => setSelectedProduct(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* CART */}

      {showCart && (
        <div className="cart-page">
          <div className="cart-top">
            <h1>My Cart</h1>

            <button className="close-btn" onClick={() => setShowCart(false)}>
              X
            </button>
          </div>

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
      )}
    </div>
  );
}

export default Home;
