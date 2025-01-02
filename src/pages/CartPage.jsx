import { useContext } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProductList from "../components/shoppingCart/CartProductList";
import CartSummary from "../components/shoppingCart/CartSummary";
// import Images from "../config/images";
import FrequentlyBoughtTogether from "../components/shoppingCart/FrequentlyBoughtTogether";
import { CartContext } from "../context/CartContext";
import Images from "../config/images";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Inter', 'Poppins', sans-serif;
  background-color: #f7f7f7;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Inter', 'Poppins', sans-serif;
  justify-content: space-between;
  background-color: #f7f7f7;
`;

// Datos de productos
  const products = [
    {
      id: 1,
      image: Images.productos.radiador,
      name: "Radiador agricola tractor Case 580 k Aluminio/Aluminio TM",
      sku: "DCAT001980",
      rating: "4.9",
      originalPrice: "$1,842",
      finalPrice: "$1,542"
    },
    {
      id: 2,
      image: Images.productos.ventilador,
      name: "Aspas para ventilador Mazda B20000, B22000",
      price: "$1,842",
      sku: "DCAT001960",
      rating: "4.9",
      originalPrice: "$1,842",
      finalPrice: "$1,542"
    },
    {
      id: 3,
      image: Images.productos.escape,
      name: "Escape resonador mofle",
      price: "$1,842",
      sku: "DCAT001960",
      rating: "4.9",
      originalPrice: "$1,842",
      finalPrice: "$1,542"
    }
    // Más productos...
  ];

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  // Ejemplo de datos iniciales

  return (
    <Container>
      <Header />
      <Container2>
        <CartProductList
          products={cart}
          onQuantityChange={updateQuantity}
          onRemoveProduct={removeFromCart}
        />
        <CartSummary products={cart} />
      </Container2>
      <FrequentlyBoughtTogether products={products} />
      <Footer />
    </Container>
  );
};

export default CartPage;
