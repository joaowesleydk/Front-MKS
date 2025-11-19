// src/services/cart.js
import api from "./api";

export async function addToCart(productId, quantity = 1, size = null) {
  const token = localStorage.getItem("token");
  const res = await api.post("/cart", { product_id: productId, quantity, size }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function getCart() {
  const token = localStorage.getItem("token");
  const res = await api.get("/cart", { headers: { Authorization: `Bearer ${token}` }});
  return res.data;
}
