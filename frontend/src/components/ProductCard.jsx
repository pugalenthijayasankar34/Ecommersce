import React from "react";


function ProductCard({ product, addToCart, showDetails }) {
  return (
    <div className="card">
      {/* IMAGE */}

      <img
        src={product.image}
        alt={product.title}
        onClick={() => showDetails(product.id)}
      />

      {/* TITLE */}

      <h3>{product.title}</h3>

      {/* RATING */}

      <div className="rating">⭐⭐⭐⭐☆</div>

      {/* PRICE */}

      <p>₹{product.price}</p>
      </div>
  );
}

export default ProductCard;
