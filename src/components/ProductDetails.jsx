import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getsingleProduct } from "../services/ProductService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getsingleProduct(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TO CART
 const addToCart = () => {
   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

   const updatedCart = [...existingCart, product];

   localStorage.setItem("cart", JSON.stringify(updatedCart));

   setCart(updatedCart);

   alert("Product Added To Cart");
 };

  // BUY NOW
  const buyNow = () => {
    alert("Proceeding to Checkout...");

    // navigate("/checkout");
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header
        cart={cart}
        handleLogout={handleLogout}
        search=""
        setSearch={() => {}}
      />

      <div className="details-page">
        <div className="details-image-box">
          <img src={product.image} alt={product.title} />

          <div className="details-buttons">
            <button className="add-cart-btn" onClick={addToCart}>
              🛒 Add To Cart
            </button>

            <button className="buy-now-btn" onClick={buyNow}>
              ⚡ Buy Now
            </button>
          </div>
        </div>

        <div className="details-info">
          <h1>{product.title}</h1>

          <div className="product-rating">⭐ 4.3 ★★★★☆ | 12,540 Ratings</div>

          <h2 className="product-price">
            ₹{product.price}
            <span className="old-price"> ₹999</span>
            <span className="discount"> 50% Off</span>
          </h2>

          <h3>Available Offers</h3>

          <ul className="offer-list">
            <li>🏦 Bank Offer - 10% Instant Discount</li>
            <li>🚚 Free Delivery Available</li>
            <li>🎁 Special Price Get Extra Discount</li>
          </ul>

          <p>{product.description}</p>

          <h4>Category: {product.category}</h4>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;