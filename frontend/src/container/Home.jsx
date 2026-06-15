import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import LoaderIcon from "@iconify-react/codex/loader";

import { getProducts } from "../services/ProductService";
import { supabase } from "../services/supabase";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // Check Supabase Connection
  useEffect(() => {
    checkConnection();
    fetchProducts();
  }, []);

  const checkConnection = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.log("Connection Failed ❌", error);
    } else {
      console.log("Supabase Connected ✅");
      console.log(data);
    }
  };

  // Get Products
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const data = await getProducts();

      console.log(data, "ALL PRODUCTS");

      setProducts(data);
    } catch (error) {
      console.log("Fetch Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Product Details
  const showDetails = (id) => {
    navigate(`/product/${id}`);
  };

  // Add To Cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Product Added To Cart");
  };

  return (
    <div>
      {/* Header */}
      <Header
        cart={cart}
        handleLogout={handleLogout}
        search=""
        setSearch={() => {}}
        goToCart={() => navigate("/cart")}
      />

      {/* Loader */}
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

          <h2>Loading Products...</h2>
        </div>
      ) : (
        <div className="product-container">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                showDetails={showDetails}
              />
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>No Products Found</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
