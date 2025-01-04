import styled from "styled-components";
import CheckoutForms from "../components/CheckoutPage/CheckoutForms";
import SummaryComponent from "../components/CheckoutPage/SummaryComponent";
import Header from "../components/Header";
import CheckoutHeader from "../components/shoppingCart/HeaderCheckOut";
// import Images from "../config/images";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";


const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Inter", "Poppins", sans-serif;

  
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f7f7f7;
  min-height: 100vh;
  font-family: "Inter", "Poppins", sans-serif;

  /* Asegurar espacio para el SummaryComponent en móviles */
  padding-bottom: ${(props) => (props.isMobile ? "12rem" : "0")}; 

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;


const LeftPanel = styled.div`
  flex: 3;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  position: ${(props) => (props.isMobile ? "fixed" : "relative")};
  bottom: ${(props) => (props.isMobile ? "0" : "auto")};
  left: ${(props) => (props.isMobile ? "0" : "auto")};
  width: ${(props) => (props.isMobile ? "100%" : "auto")};
  z-index: ${(props) => (props.isMobile ? "1004" : "1")};
  background: ${(props) => (props.isMobile ? "#fff" : "none")};
  box-shadow: ${(props) =>
    props.isMobile ? "0px -2px 8px rgba(0, 0, 0, 0.1)" : "none"};
`;

const CheckoutPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [formData, setFormData] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [summaryVisible, setSummaryVisible] = useState(false); // Empieza oculto

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  // Detectar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mostrar/ocultar el resumen según el scroll
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // Mostrar el resumen cuando el usuario esté cerca del final
        const bottomReached = scrollPosition + windowHeight >= documentHeight - 20;

        setSummaryVisible(bottomReached);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  // Imprimir valores solo cuando cambien
  useEffect(() => {
    console.log("is mobile: ", isMobile);
    console.log("visible", summaryVisible);
  }, [isMobile, summaryVisible]);

  return (
    <ContainerMain>
      <Header />
      <CheckoutHeader />
      <ContentContainer isMobile={isMobile}>
        <LeftPanel>
          <CheckoutForms
            products={cart}
            onRemoveProduct={removeFromCart}
            onFormChange={handleFormChange}
          />
        </LeftPanel>
        <RightPanel isMobile={isMobile}>
          <SummaryComponent
            products={cart}
            formData={formData}
            isMobile={isMobile}
            visible={summaryVisible}
          />
        </RightPanel>
      </ContentContainer>
    </ContainerMain>
  );
};


export default CheckoutPage;
