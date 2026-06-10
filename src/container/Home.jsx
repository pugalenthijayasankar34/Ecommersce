import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

import LoaderIcon from "@iconify-react/codex/loader";

import { getProducts } from "../services/ProductService";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [cart, setCart] = useState([]);

  
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

  const showDetails = (id) => {
    navigate(`/product/${id}`);
  };

  /* ADD TO CART */

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);

    console.log(product, "ADDED TO CART");
  };

  return (
    <div>
      {/* HEADER */}

      <Header
        cart={cart}
        handleLogout={handleLogout}
        goToCart={() => navigate("/cart", { state: { cart } })}
      />

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
    </div>
  );
}

export default Home;
