import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import  CustomButton  from "../customcomponent/button/CustomButton";
import { useNavigate } from "react-router-dom";
export default function AddProduct(cart=[], handleLogout=()=>{}) {
 const [product, setProduct] = useState({
   title: "",
   price: "",
   category: "",
   description: "",
   stock: "",
   imageFile: null,
 });
const navigate = useNavigate();
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products", product);


      setProduct({
        title: "",
        price: "",
        category: "",
        imageFile: null,
        description: "",
        stock: "",
      });
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
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
      <div className="container mt-5">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            className="form-control mb-3"
            value={product.title}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="form-control mb-3"
            value={product.price}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            className="form-control mb-3"
            value={product.category}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL"
            className="form-control mb-3"
            value={product.image}
            onChange={handleChange}
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) =>
              setProduct({
                ...product,
                imageFile: e.target.files[0],
              })
            }
          />

          <textarea
            name="description"
            placeholder="Description"
            className="form-control mb-3"
            value={product.description}
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            className="form-control mb-3"
            value={product.stock}
            onChange={handleChange}
          />

          <CustomButton type="submit" variant="success">
            Add Product
          </CustomButton>
        </form>
      </div>
    </>
  );
}
