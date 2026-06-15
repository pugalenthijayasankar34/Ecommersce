import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });

  // Fetch all products
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

  // Handle input changes
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          product,
        );

        alert("Product Updated Successfully!");
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/products", product);

        alert("Product Added Successfully!");
      }

      // Clear form
      setProduct({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });

      // Refresh product list
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  // Edit product
  const handleEdit = (item) => {
    setProduct({
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
      stock: item.stock,
    });

    setEditId(item.id);
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      alert("Product Deleted Successfully!");
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{editId ? "Update Product" : "Add Product"}</h2>

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

        <button className="btn btn-success">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />

      <h3>Products</h3>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((item) => (
          <div key={item.id} className="card p-3 mb-3">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                  style={{ height: "100px", objectFit: "cover" }}
                />
              </div>

              <div className="col-md-7">
                <h5>{item.title}</h5>
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

              <div className="col-md-3">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
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
  );
}
