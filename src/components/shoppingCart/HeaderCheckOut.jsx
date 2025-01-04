import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 
import BackButtonIMG from "../../assets/home/icons/arrow_circle_left.png";

const HeaderContainer = styled.div`
  background-color: #f7f7f7;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  margin-right: 1rem;
  transition: color 0.3s;

  &:hover {
    color: #000;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 1.9rem;
  color: #333;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;

const CheckoutHeader = () => {
  const navigate = useNavigate(); // Hook para navegar

  const handleBack = () => {
    navigate("/shoppingcart"); // Redirige al carrito
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}><img src={BackButtonIMG}/></BackButton>
      <Title>Termina tu compra</Title>
    </HeaderContainer>
  );
};

export default CheckoutHeader;
