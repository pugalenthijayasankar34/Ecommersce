import axios from "axios";

// ✅ Base API (IMPORTANT FIX)
const API_URL = "http://localhost:5000/api";

const BASE_URL = "https://dummyjson.com";

// 🔵 Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// 🔵 Get single product
export const getsingleProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// 🔵 Login API (DummyJSON)
export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, payload);
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
  }
};
