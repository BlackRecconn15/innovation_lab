import PropTypes from "prop-types";
import styled from "styled-components";
import encryptedIMG from "../../assets/home/icons/encrypted.png";
import api from "../../services/api";
import { useUser } from "../../context/UserContext";

const Container = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;

  &.total {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 0.5rem;
`;


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
  margin-top: 1rem;

  img {
    margin-right: 0.5rem;
    height: 20px;
  }

  &:hover {
    background-color: rgb(178, 209, 0);
  }
`;

const SummaryComponent = ({ products, formData }) => {

  const { user } = useUser();

  const userId = user?.id; // Rescata el user_id del contexto

  const handlePurchase = async () => {
    const shippingAddress = `${formData.street} ${formData.extNumber}${
      formData.intNumber ? `, Int. ${formData.intNumber}` : ""
    }, ${formData.colony}`;
  
    const purchaseData = {
      user_id: userId, // Cambia esto por el ID del usuario actual si lo tienes
      total,
      shipping_address: shippingAddress,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postalCode,
      items: products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: cleanPrice(product.finalPrice),
      })),
    };
  
    console.log("Datos de la compra:", purchaseData);
  

    try {
      const response = await api.post("/purchases", purchaseData);
      alert("¡Compra registrada con éxito!");
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.detail || "No se pudo procesar la compra"}`);
      } else {
        alert("Error al registrar la compra. Inténtalo de nuevo.");
      }
    }
  };
  
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
  
  const shipping = subtotal > 1000 ? 0 : 250;
  const total = subtotal + shipping;

  return (
    <Container>
      <Title>Resumen de compra</Title>
      <SummaryItem>
        <span>Subtotal ({products.length})</span>
        <span>${subtotal.toFixed(2)} MXN</span>
      </SummaryItem>
      <SummaryItem>
        <span>Envío</span>
        <span>${shipping.toFixed(2)} MXN</span>
      </SummaryItem>
      <SummaryItem className="total">
        <span>TOTAL</span>
        <span>${total.toFixed(2)} MXN</span>
      </SummaryItem>
      <InputField placeholder="Titular de la tarjeta" />
      <InputField placeholder="Número de tarjeta" />
      <SecureButton onClick={handlePurchase}>
        <img src={encryptedIMG} alt="Secure" />
        Compra 100% segura
      </SecureButton>
    </Container>
  );
};


SummaryComponent.propTypes = {
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
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    extNumber: PropTypes.string.isRequired,
    intNumber: PropTypes.string,
    colony: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  
};


export default SummaryComponent;
