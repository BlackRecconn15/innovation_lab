import styled from "styled-components";
import PropTypes from "prop-types";

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
  z-index: 10000; /* Aseguramos que esté por encima de todo */
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

const Modal = ({ children, onClose }) => (
  <Overlay>
    <ModalContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </ModalContainer>
  </Overlay>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
