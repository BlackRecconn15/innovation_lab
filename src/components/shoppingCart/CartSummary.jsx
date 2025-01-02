import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import encryptedIMG from "../../assets/home/icons/encrypted.png";

// Contenedor principal del resumen
const SummaryContainer = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #ddd;
  margin-top: 9rem;
  margin-right: 1rem;
  max-height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

// Ítems del resumen (Subtotal, Envío, Total)
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;

  &.total {
    font-weight: bold;
    font-size: 1.3rem;
    color: #333;
  }
`;

// Botón de pago


// Botón de "Compra 100% segura"
const SecureButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #d8ff00;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-top: 0.5rem;

  img {
    margin-right: 0.5rem;
    height: 20px;
  }

  &:hover {
    background-color: rgb(178, 209, 0);
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
  const shipping = subtotal > 1000 ? 0 : 250; // Envío gratis para pedidos mayores a $1000
  const total = subtotal + shipping;

  return (
    <SummaryContainer>
      <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>
        Resumen de compra
      </h2>
      <SummaryItem>
        <span>Subtotal ({products.length})</span>
        <span>${subtotal.toFixed(2)} MXN</span>
      </SummaryItem>
      <SummaryItem>
        <span>Envío</span>
        <span>${shipping.toFixed(2)} MXN</span>
      </SummaryItem>
      <SummaryItem className="total">
        <span>Total</span>
        <span>${total.toFixed(2)} MXN</span>
      </SummaryItem>
      <SecureButton onClick={() => navigate("/pay")}>
        <img src={encryptedIMG} alt="Encrypted" />
        Compra 100% segura
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
