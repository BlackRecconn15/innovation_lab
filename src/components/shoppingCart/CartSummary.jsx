import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import encryptedIMG from "../../assets/home/icons/encrypted.png";
import starIcon from "../../assets/home/icons/star-fill.png"; // Ícono de estrella

// Contenedor principal del resumen
const SummaryContainer = styled.div`
  position: ${(props) => (props.isMobile ? "fixed" : "relative")};
  bottom: ${(props) => (props.isMobile ? "0" : "auto")};
  left: ${(props) => (props.isMobile ? "0" : "auto")};
  width: ${(props) => (props.isMobile ? "92%" : "auto")};
  z-index: ${(props) => (props.isMobile ? "1001" : "auto")};
  background-color: #fff;
  box-shadow: ${(props) =>
    props.isMobile ? "0px -2px 8px rgba(0, 0, 0, 0.1)" : "none"};
  transform: translateY(${(props) => (props.visible ? "0%" : "100%")});
  transition: transform 0.3s ease-in-out;
  padding: 1rem;
  border-radius: ${(props) => (props.isMobile ? "0" : "12px")};
  /* Otros estilos... */

  @media (min-width: 768px) {
    position: relative;
    transform: none;
    bottom: auto;
    width: auto;
  }
`;


// Título del resumen
const Title = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

// Ítems del resumen (Subtotal, Envío, Total, Calificación)
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;

  .highlight {
    color: #28a745;
    font-weight: bold;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;

    img {
      width: 16px;
      height: 16px;
    }
  }

  &.total {
    font-weight: bold;
    font-size: 1.3rem;
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    &.total {
      font-size: 1.1rem;
    }
  }
`;

// Botón de pago
const SecureButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #d8ff00;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  align-content: center;
  text-align: center;
  margin-top: 1rem;

  img{
    top: 5px;
  }

  &:hover {
    background-color: rgb(178, 209, 0);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const CartSummary = ({ products, isMobile, visible }) => {
  const navigate = useNavigate();

  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.-]+/g, ""));
    }
    return price;
  };

  const subtotal = products.reduce(
    (sum, product) => sum + cleanPrice(product.finalPrice) * product.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 100; // Costo de envío dinámico
  const total = subtotal + shipping;
  const rating = 4.9; // Calificación fija para este ejemplo

  return (
    <SummaryContainer isMobile={isMobile} visible={visible}>
      <Title>Resumen de compra</Title>
      <SummaryItem>
        <span>Producto</span>
        <span>${subtotal.toFixed(2)} MXN</span>
      </SummaryItem>
      <SummaryItem>
        <span>Envío</span>
        <span className="highlight">Llega mañana ${shipping.toFixed(2)}</span>
      </SummaryItem>
      <SummaryItem>
        <span>Calificación</span>
        <span className="rating">
          <img src={starIcon} alt="Star" />
          {rating}
        </span>
      </SummaryItem>
      <SummaryItem className="total">
        <span>Total</span>
        <span>${total.toFixed(2)} MXN</span>
      </SummaryItem>
      <SecureButton onClick={() => navigate("/pay")}>
        <img src={encryptedIMG} alt="Secure" /> Continuar compra
      </SecureButton>
    </SummaryContainer>
  );
};

CartSummary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      finalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  isMobile: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default CartSummary;
