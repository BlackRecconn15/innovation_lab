import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled Components
const FilterMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 1.6rem;
  height: fit-content;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    border: none;
    border-radius: 0;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const ToggleLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  font-size: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    margin: 0;
  }
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

  @media (max-width: 768px) {
    appearance: none;
    width: 30px;
    height: 13px;
    background: #ccc;
    border-radius: 15px;
    position: relative;
    outline: none;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
      top: 1px;
      left: 1px;
      transition: 0.3s;
    }
  }
`;

const DropdownSection = styled.div`
  margin-top: 1.5rem;
  

  @media (max-width: 768px) {
    margin-top: 0;
    margin-left: 1rem;
    justify-content: flex-start;
    align-self: start;
  }
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
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

  @media (max-width: 768px) {
    margin: 0;
  }
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

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

// Functional Component
const FilterMenu = ({ toggles, checkboxes }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <FilterMenuContainer>
      {/* Toggle Filters */}
      <FilterSection>
        {toggles.map((toggle, index) => (
          <ToggleLabel key={index}>
            {toggle.label}
            <ToggleSwitch
              type="checkbox"
              checked={toggle.value}
              onChange={() => toggle.onChange(!toggle.value)}
            />
          </ToggleLabel>
        ))}
      </FilterSection>

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
