import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import encryptedIMG from "../../assets/home/icons/encrypted.png";
import starIcon from "../../assets/home/icons/star-fill.png"; // Ícono de estrella

// Contenedor principal del resumen
const SummaryContainer = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #ddd;
  margin-top: 9rem;
  margin-right: 1rem;
  max-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 94%;
    margin: 0;
    padding: 1.5rem;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 0;
    background-color: #fff;
    z-index: 1001;
  }

  @media (max-width: 391px) {
    width: 88%;
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
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: rgb(178, 209, 0);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const CartSummary = ({ products }) => {
  const navigate = useNavigate();

  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.-]+/g, "")); // Elimina caracteres no numéricos
    }
    return price; // Devuelve el número si ya está limpio
  };

  const subtotal = products.reduce(
    (sum, product) => sum + cleanPrice(product.finalPrice) * product.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 100; // Costo de envío dinámico
  const total = subtotal + shipping;
  const rating = 4.9; // Calificación fija para este ejemplo

  return (
    <SummaryContainer>
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
        Continuar compra
      </SecureButton>
    </SummaryContainer>
  );
};

// Validación de props
CartSummary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      finalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CartSummary;
