import styled from "styled-components";
import CheckoutForms from "../components/CheckoutPage/CheckoutForms";
import SummaryComponent from "../components/CheckoutPage/SummaryComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutHeader from "../components/shoppingCart/HeaderCheckOut";
// import Images from "../config/images";
import { useContext, useState } from "react";
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
`;

const LeftPanel = styled.div`
  flex: 3;
  margin-right: 2rem;
`;

const RightPanel = styled.div`
  flex: 1;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
`;

const CheckoutPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [formData, setFormData] = useState({});

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  return (
    <ContainerMain>
      <Header />
      <CheckoutHeader />
      <ContentContainer>
        <LeftPanel>
          <CheckoutForms
            products={cart}
            onRemoveProduct={removeFromCart}
            onFormChange={handleFormChange}
          />
        </LeftPanel>
        <RightPanel>
          <SummaryComponent products={cart} formData={formData} />
        </RightPanel>
      </ContentContainer>
      <Footer />
    </ContainerMain>
  );
};

export default CheckoutPage;
