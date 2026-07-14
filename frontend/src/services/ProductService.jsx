import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:5000/api";

// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);

    throw error;
  }
};

// GET SINGLE PRODUCT
export const getsingleProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);

    throw error;
  }
};

// ADD PRODUCT
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);

    throw error;
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);

    throw error;
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);

    throw error;
  }
};
