import styled from "styled-components";
import PropTypes from "prop-types";
import errorIMG from "../../assets/home/icons/error.png";
import closeIMG from "../../assets/home/icons/close.png";
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
  z-index: 1000;
  padding: 1rem; /* Asegura que no se corte en pantallas pequeñas */
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  max-height: 90vh; /* Altura máxima del modal */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto; /* Habilitar scroll si el contenido excede */
  position: relative;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px; /* Ajuste dinámico */
  right: 10px;
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

  h2 {
    font-size: 1.5rem;
    color: #333;
    text-align: center;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #666;
    text-align: center;
  }

  img {
    width: 100px;
    height: auto;
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #333;
  }
`;

const ErrorModal = ({ onClose }) => (
  <Overlay>
    <ModalContainer>
      <CloseButton onClick={onClose}><img src={closeIMG}/></CloseButton>
      <Header>
        <h2>Lo sentimos no pudimos procesar tu pago</h2>
        <p>Intenta nuevamente o consulta a tu banco.</p>
        <img src={errorIMG} alt="Compra fallida" />
      </Header>
      <Button onClick={onClose}>Reintentar</Button>
    </ModalContainer>
  </Overlay>
);

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ErrorModal;

  