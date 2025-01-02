import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
// Switch estilizado
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1rem 0;
  
`;

const SwitchLabel = styled.span`
  font-size: 14px;
  color: #555;
`;

const SwitchInput = styled.input`
  display: none;
`;

const Switch = styled.label`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  ${SwitchInput}:checked + & {
    background-color: #000;

    &::before {
      transform: translateX(20px);
    }
  }
`;


const SwitchComponent = ({title}) => {
    const [rememberMe, setRememberMe] = useState(false);
    
    return (
        <SwitchContainer>
        <SwitchInput
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Switch htmlFor="remember-me" />
        <SwitchLabel>{title}</SwitchLabel>
      </SwitchContainer>
    );
  };

  // Validación de props
  SwitchComponent.propTypes = {
    title: PropTypes.string.isRequired,
    
  };
  
  export default SwitchComponent;
  