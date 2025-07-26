// src/api.js
export const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5069/api/products"); // your API URL
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};
