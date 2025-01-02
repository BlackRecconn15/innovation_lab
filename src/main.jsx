import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // Página principal

import RegisterPage from "./pages/RegisterPage"; // Página de registro
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/shoppingcart" element={<CartPage />} />
        <Route path="/pay" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
