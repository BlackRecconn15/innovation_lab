import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProductList from "../components/shoppingCart/CartProductList";
import CartSummary from "../components/shoppingCart/CartSummary";
// import Images from "../config/images";
import FrequentlyBoughtTogether from "../components/shoppingCart/FrequentlyBoughtTogether";
import { useCart } from "../context/CartContext";
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Datos de productos
  const productsTest = [
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
    }
    // Más productos...
  ];

  const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

  // Depuración
  console.log("Contenido del carrito:", cart);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [summaryVisible, setSummaryVisible] = useState(true);
  
    // Detectar si es móvil
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    // Manejar la visibilidad del resumen con el scroll
    useEffect(() => {
      if (isMobile) {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const documentHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
  
          // Mostrar el resumen cuando el usuario está cerca del final
          const bottomReached = scrollPosition + windowHeight >= documentHeight - 10;
          setSummaryVisible(bottomReached);
        };
  
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    }, [isMobile]);
  
    return (
      <Container>
        <Header />
        <Container2>
          <CartProductList
            products={cart}
            onQuantityChange={updateQuantity}
            onRemoveProduct={removeFromCart}
          />
          
          <CartSummary products={cart} isMobile={isMobile} visible={summaryVisible} />
        </Container2>
        <FrequentlyBoughtTogether products={productsTest} />
        <Footer />
      </Container>
    );
  };
  

export default CartPage;
