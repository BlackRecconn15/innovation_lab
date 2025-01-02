import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled Components
const FilterMenuContainer = styled.div`
  width: 20%; /* Ocupa el 20% del ancho total */
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 30%; /* Ajusta la altura automáticamente */
  margin: 1.6rem;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ToggleLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  font-size: 1rem;
  color: #333;
`;

const ToggleSwitch = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background: #ccc;
  border-radius: 15px;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background: #007bff;
  }

  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: 0.3s;
  }

  &:checked::before {
    transform: translateX(20px);
  }
`;

const DropdownSection = styled.div`
  margin-top: 1.5rem;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const DropdownIcon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const CheckboxContainer = styled.div`
  margin: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 0.875rem;
  color: #666;
  cursor: pointer;

  input {
    margin-right: 0.5rem;
  }
`;

// Functional Component
const FilterMenu = ({ toggles, checkboxes }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <FilterMenuContainer>
      {/* Toggle Filters */}
      {toggles.map((toggle, index) => (
        <FilterSection key={index}>
          <ToggleLabel>
            {toggle.label}
            <ToggleSwitch
              type="checkbox"
              checked={toggle.value}
              onChange={() => toggle.onChange(!toggle.value)}
            />
          </ToggleLabel>
        </FilterSection>
      ))}

      {/* Dropdown for Marcas */}
      <DropdownSection>
        <DropdownHeader onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Marcas
          <DropdownIcon isOpen={isDropdownOpen}>▼</DropdownIcon>
        </DropdownHeader>
        <CheckboxContainer isOpen={isDropdownOpen}>
          {checkboxes.map((checkbox, index) => (
            <CheckboxLabel key={index}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => checkbox.onChange(!checkbox.checked)}
              />
              {checkbox.label}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      </DropdownSection>
    </FilterMenuContainer>
  );
};

// PropTypes for validation
FilterMenu.propTypes = {
  toggles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default FilterMenu;
