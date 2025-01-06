import PropTypes from "prop-types";
import styled from "styled-components";
import encryptedIMG from "../../assets/home/icons/encrypted.png";
import api from "../../services/api";
import { useUser } from "../../context/UserContext";
import Modal from "../Modals/modal";
import { useState } from "react";
import SuccessModal from "../Modals/SucessModal";
import ErrorModal from "../Modals/ErrorModal";
import cardIMG from "../../assets/home/icons/card.svg"
import { FaSpinner } from "react-icons/fa";

const Container = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: ${(props) => (props.isMobile ? "fixed" : "relative")};
  bottom: ${(props) => (props.isMobile ? "0" : "auto")};
  left: ${(props) => (props.isMobile ? "0" : "auto")};
  width: ${(props) => (props.isMobile ? "92%" : "auto")};
  border-radius: ${(props) => (props.isMobile ? "0" : "12px")};
  z-index: ${(props) => (props.isMobile ? "1000" : "1")}; 
  box-shadow: ${(props) =>
    props.isMobile ? "0px -2px 8px rgba(0, 0, 0, 0.1)" : "0px 4px 8px rgba(0, 0, 0, 0.1)"};
  transform: translateY(${(props) => (props.visible ? "0%" : "100%")});
  transition: transform 0.3s ease-in-out;

  @media (min-width: 768px) {
    position: relative;
    transform: none;
    width: auto;
    bottom: auto;
  }
`;



const Title = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const SummaryContainer = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  margin-top: 1rem;

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    span {
      font-size: 1rem;
      color: #333;

      &.total {
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #f7f7f7;

  img {
    width: 20px;
    height: 20px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background-color: #2d3e50;
  color: #fff;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: none;
  border-left: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #1e2b38;
  }

  span {
    color: #25db91;
    font-weight: bold;
    margin-left: 0.25rem;
  }
`;
const InfoText = styled.p`
  font-size: 0.6rem;
  color: #666;
  text-align: start;
  margin: 1rem 0;
`;

const InputField = styled.input`
  width: 92%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  color: ${(props) => (props.disabled ? "#666" : "#fff")};
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }

  .spinner {
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SecureInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #d8ff00;
  border-radius: 8px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  span {
    font-size: 0.9rem;
    color: #333;
    font-weight: bold;
  }
`;

const SummaryComponent = ({ products, formData, isMobile, visible  }) => {
  
  const { user } = useUser();
  const userId = user?.id;
  const [modalContent, setModalContent] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true); // Activar el estado de carga
  
    const shippingAddress = `${formData.street} ${formData.extNumber}${
      formData.intNumber ? `, Int. ${formData.intNumber}` : ""
    }, ${formData.colony}`;
  
    const purchaseData = {
      user_id: userId,
      total,
      shipping_address: shippingAddress,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postalCode,
      items: products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.finalprice,
      })),
    };
  
    try {
      await api.post("/purchases", purchaseData);
      setModalContent(
        <SuccessModal
          onClose={() => setModalContent(null)}
          summary={{ subtotal, shipping, total }}
          payment={{
            cardNumber: `${cardNumber.slice(-4)}`, // Ocultar números excepto los últimos 4
          }}
          address={shippingAddress}
        />
      );
    } catch (error) {
      setModalContent(
        <ErrorModal onClose={() => setModalContent(null)} />
      );
      console.error("Error al registrar la compra:", error);
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  };


  const subtotal = products.reduce(
    (sum, product) => sum + product.finalprice * product.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 250;
  const total = subtotal + shipping;
  return (
    <Container isMobile={isMobile} visible={visible}>
      <Title>Resumen de compra</Title>
      <SummaryContainer>
        <div className="summary-item">
          <span>Subtotal ({products.length})</span>
          <span>${subtotal.toFixed(2)} MXN</span>
        </div>
        <div className="summary-item">
          <span>Envío</span>
          <span>${shipping.toFixed(2)} MXN</span>
        </div>
        <div className="summary-item">
          <span className="total"
          >TOTAL</span>
          <span className="total">${total.toFixed(2)} MXN</span>
        </div>
      </SummaryContainer>
      <InfoText>Todas las transacciones son seguras y están encriptadas</InfoText>
      <InputField placeholder="Titular de la tarjeta" />
      <InputContainer>
      {/* Icono inicial */}
      <IconWrapper>
        <img
          src={cardIMG} // Reemplázalo con tu ícono real
          alt="Card Icon"
        />
      </IconWrapper>

      {/* Input */}
      <StyledInput   
      placeholder="Número de tarjeta"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)} // Actualizar el estado del número de tarjeta
         />

      {/* Botón final */}
      <ActionButton>
        Utilizar <span>link</span>
      </ActionButton>
    </InputContainer>
    <SubmitButton onClick={handlePurchase} disabled={isLoading}>
      {isLoading ? 
      <span>
        <FaSpinner className="spinner" /> Procesando...
      </span> 
    : "Comprar"}
    </SubmitButton>
      <SecureInfo>
        <img src={encryptedIMG} alt="Secure" />
        <span>Compra 100% segura</span>
      </SecureInfo>

      {modalContent && <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>}
    </Container>
  );
};

SummaryComponent.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      finalprice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  formData: PropTypes.shape({
    street: PropTypes.string.isRequired,
    extNumber: PropTypes.string.isRequired,
    intNumber: PropTypes.string,
    colony: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired, // Add this prop
};

export default SummaryComponent;
