import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CheckOutProductItem from "./CheckOutProducts";

const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  input,
  select {
    flex: 1;
    min-width: 200px;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }
`;

const ListContainer = styled.div`
  flex: 3;
`;

const CheckoutForms = ({ products, onRemoveProduct, onFormChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    street: "",
    extNumber: "",
    intNumber: "",
    colony: "",
    postalCode: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onFormChange({ ...formData, [name]: value }); // Actualiza el estado en el padre
  };

  return (
    <>
      <Section>
        <SectionTitle>Contacto</SectionTitle>
        <FormGroup>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </FormGroup>
        <SectionTitle>Datos para entrega</SectionTitle>
        <FormGroup>
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="street"
            placeholder="Calle"
            value={formData.street}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="extNumber"
            placeholder="Número exterior"
            value={formData.extNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="intNumber"
            placeholder="Número interior"
            value={formData.intNumber}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="colony"
            placeholder="Colonia"
            value={formData.colony}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Código postal"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="">Selecciona estado</option>
            <option value="CDMX">Ciudad de México</option>
            <option value="Jalisco">Jalisco</option>
            {/* Agrega más estados */}
          </select>
        </FormGroup>
      </Section>
      <Section>
        <SectionTitle>Revisar artículos y envío</SectionTitle>
        <ListContainer>
          {products.map((product) => (
            <CheckOutProductItem
              key={product.id}
              product={product}
              onRemoveProduct={onRemoveProduct}
            />
          ))}
        </ListContainer>
      </Section>
    </>
  );
};

CheckoutForms.propTypes = {
  products: PropTypes.array.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

export default CheckoutForms;
