import styled from "styled-components";
import PropTypes from "prop-types";
import thanksIMG from "../../assets/home/icons/Thank_you.png"
import closeIMG from "../../assets/home/icons/close.png"
import visaIMG from "../../assets/home/icons/logos_visa.png"
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1010;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow-y: auto;
  max-height: 90%;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;

  img {
    width: 150px;
    height: auto;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 1rem 0;
`;

const Summary = styled.div`
  margin-bottom: 1rem;

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    span {
      font-size: 1rem;
      color: #333;
    }

    &.total {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const PaymentDetails = styled.div`
  margin-top: 1rem;

  .cardContent{
    display:flex;
    flex-direction:row;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .payment-info,
  .shipping-info {
    background-color: #f7f7f7;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;

    span {
      display: block;
      font-size: 1rem;
      color: #333;

      &.status {
        font-size: 0.9rem;
        color: green;
        margin-top: 0.5rem;
      }
    }
  }
`;

const ContinueButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const SuccessModal = ({ onClose, summary, payment, address }) => {
  const { subtotal, shipping, total } = summary;
  const navigate = useNavigate();

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}><img src={closeIMG}/></CloseButton>
        <Header>
        <h2>¡Gracias por comprar en Merauto!</h2>
        <p>Tu pago fue procesado con éxito</p>
          <img
            src={thanksIMG}
            alt="Gracias por tu compra"
          />
        </Header>
        <Divider />
        <Summary>
          <h3>Resumen de compra</h3>
          <div className="summary-item">
            <span>(4)</span>
            <span>$1000.00 MXN</span>
          </div>
          <div className="summary-item">
            <span>(1)</span>
            <span>$500.00 MXN</span>
          </div>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} MXN</span>
          </div>
          <div className="summary-item">
            <span>Envío</span>
            <span>${shipping.toFixed(2)} MXN</span>
          </div>
          <div className="summary-item total">
            <span>TOTAL</span>
            <span>${total.toFixed(2)} MXN</span>
          </div>
        </Summary>
        <PaymentDetails>
            <div className="cardContent">
          <div className="payment-info">
            <span>Pago</span>
            <span>Visa **** {payment.last4}</span>
            <span className="status">Pago aprobado</span>
            </div>
            <div style={{marginRight: '1.5rem'}}>
            <img src={visaIMG} />
            </div>
          </div>
          <div className="shipping-info">
            <span>Envío</span>
            <span>{address}</span>
            <span className="status">{payment.units} unidad(es)</span>
          </div>
        </PaymentDetails>
        <ContinueButton  onClick={() => navigate("/catalog")}>Seguir comprando</ContinueButton>
      </ModalContainer>
    </Overlay>
  );
};

SuccessModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  summary: PropTypes.shape({
    subtotal: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  payment: PropTypes.shape({
    method: PropTypes.string.isRequired,
    last4: PropTypes.string.isRequired,
    units: PropTypes.number.isRequired,
  }).isRequired,
  address: PropTypes.string.isRequired,
};

export default SuccessModal;
