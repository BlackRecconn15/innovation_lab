import styled from "styled-components";
import Header from "../components/Header"; // Importa el Header
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Importa Axios configurado
import { useState } from "react";


// Contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Poppins', sans-serif;
  background-color: #f9f9f9; /* Fondo claro */
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  width: 90%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 22px;
  color: black;
  text-align: center;
  margin-bottom: 1rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 4px;
  background-color: #d9ff00; /* Color del header */
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: black;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  flex: 1;
  font-size: 14px;
  color: #333;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 0.5rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    max-width: 330px;
  }
`;

const Button = styled.button`
  background-color: #d4ff00;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width:auto;

  &:hover {
    background-color: #b1e600;
  }
`;

const UploadButton = styled(Button)`
  margin-top: 7px;
`;

const CheckboxGroup = styled.div`
    margin-top: 3rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;

    label {
        font-size: 14px;
        color: #555;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;

        input {
        margin-right: 0.5rem;
        }
    }
`;

const SubmitButton = styled(Button)`
  background-color: black;
  color: white;
  width: 20%;
  border-radius: 20px;

  &:hover {
    background-color: #333;
  }
`;

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    business_name: "",
    phone: "",
    email: "",
    password: "",
    street: "",
    ext_number: "",
    int_number: "",
    colony: "",
    postal_code: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [Accepted, setAccepted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      console.log("Datos enviados:", formData);
      const response = await api.post("/users", formData);
      console.log("Usuario creado:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <Title>Hola, te pedimos algunos datos para crear una cuenta de marca</Title>
        <Separator />
        <Form onSubmit={handleSubmit}>
          <SectionTitle>Información de la empresa</SectionTitle>
          <Row>
            <Label>
              Nombre Comercial
              <input
                type="text"
                name="business_name"
                placeholder="Nombre Comercial"
                value={formData.business_name}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Teléfono de la empresa
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              CFS
              <UploadButton>Upload</UploadButton>
            </Label>
          </Row>
          <Row>
          <Label>
              Identificacion Oficial
              <UploadButton>Upload</UploadButton>
            </Label>
            <Label>
              Correo
              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Contraseña
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Label>
          </Row>

          <SectionTitle>Dirección</SectionTitle>
          <Row>
            <Label>
              Calle
              <input
                type="text"
                name="street"
                placeholder="Calle"
                value={formData.street}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Número exterior
              <input
                type="text"
                name="ext_number"
                placeholder="Número exterior"
                value={formData.ext_number}
                onChange={handleInputChange}
              />
            </Label>
          </Row>
          <Row>
            <Label>
              Número interior
              <input
                type="text"
                name="int_number"
                placeholder="Número interior"
                value={formData.int_number}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Colonia
              <input
                type="text"
                name="colony"
                placeholder="Colonia"
                value={formData.colony}
                onChange={handleInputChange}
              />
            </Label>
          </Row>
          <Row>
            <Label>
              Código Postal
              <input
                type="text"
                name="postal_code"
                placeholder="Código Postal"
                value={formData.postal_code}
                onChange={handleInputChange}
              />
            </Label>
          </Row>

          <CheckboxGroup>
          <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              Acepto los Términos y condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad.
            </label>
            <label>
              <input
                type="checkbox"
                checked={Accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              Acepto recibir información por correo
            </label>
          </CheckboxGroup>

          <div style={{ textAlign: "center" }}>
            <SubmitButton type="submit">Crear</SubmitButton>
          </div>
        </Form>
      </MainContent>
    </Container>
  );
};


export default RegisterPage;
