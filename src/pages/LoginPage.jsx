import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styled from "styled-components";
import api from "../services/api"; // Importa Axios configurado
import backImage from "../assets/image-1.png";
import googleIMG from "../assets/home/icons/google.png";
import appleIMG from "../assets/home/icons/apple.png";
import facebookIMG from "../assets/home/icons/facebook.png";
import Logo from "../assets/home/icons/logo.png";
import MenuIcon from "../assets/home/icons/menu.png";

// Contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter', 'Poppins', sans-serif;
`;

// Header
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LogoImage = styled.img`
    top: 56px;
    left: 32px;
    width: 89px;
    height: 30px; /* Ajusta el tamaño del logo */
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  top: 56px;
  right: 20px;

  img {
    width: 30px; /* Ajusta el tamaño del ícono */
    height: 20px;
  }
`;

// Contenedor principal de contenido
const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

// Sección izquierda
const LeftSection = styled.div`
  width: 651px;
  height: 814px;
  border-radius: 16px; /* Bordes redondeados */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftImageElement = styled.img`
  width: 90%;
  height: auto;
  border-radius: 12px; /* Bordes redondeados de la imagen */
`;

// Sección derecha (formulario)
const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 482px;
  max-height: 592px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 105%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #d4ff00;
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b1e600;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
    width: 107%;


  button {
    flex: 1;
    margin: 0 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    width: 200px;
    cursor: pointer;
  }

  .google {
    background-color: #fff;
    border: 1px solid #ccc;
  }

  .facebook {
    background-color: #1877f2;
    color: white;
  }

  .apple {
    background-color: #000;
    color: white;
  }
`;

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

const RegisterBtn = styled.button`
    background: #000;
    color: #fff;
    border: none;
    width: 115px;
    height: 27px;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: left;
`;


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { login } = useUser();
  // Maneja el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", formData); 
      const { access_token, user  } = response.data;

      console.log({user});
      
      // Guarda los datos del usuario en el contexto
      login({ id: user.id, email: user.email, username: user.business_name });

      if (access_token) {
        // Guarda el token en localStorage o sessionStorage
        if (rememberMe) {
          localStorage.setItem("authToken", access_token);
        } else {
          sessionStorage.setItem("authToken", access_token);
        }
  
        navigate("/home"); // Redirige al home
      } else {
        setErrorMessage("No se recibió un token válido. Verifica tu conexión.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };
  

  return (
    <Container>
      {/* Header */}
      <Header>
        <LogoImage src={Logo} alt="Logo" />
        <MenuButton>
          <img src={MenuIcon} alt="Menu" />
        </MenuButton>
      </Header>

      {/* Contenido principal */}
      <MainContent>
        {/* Sección izquierda */}
        <LeftSection>
          <LeftImageElement src={backImage} alt="Imagen principal" />
        </LeftSection>

        {/* Sección derecha */}
        <RightSection>
          <FormContainer>
            <Title style={{ textAlign: "left" }}>Inicia sesión</Title>
            <form onSubmit={handleLogin}>
              <div style={{ textAlign: "left" }}>Email o nombre de usuario</div>
              <Input
                type="text"
                name="email"
                placeholder="Email o nombre de usuario"
                value={formData.email}
                onChange={handleInputChange}
              />

              <div style={{ textAlign: "left" }}>Contraseña</div>
              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />

              {/* Recuérdame */}
              <div style={{ textAlign: "left" }}>
                <SwitchContainer>
                  <SwitchInput
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Switch htmlFor="remember-me" />
                  <SwitchLabel>Recuérdame</SwitchLabel>
                </SwitchContainer>
              </div>

              {errorMessage && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              )}

              <Button type="submit">INICIAR SESIÓN</Button>
            </form>

            {/* Otras opciones */}
            <div style={{ textAlign: "left" }}>
              <small style={{ color: "#222", fontSize: "0.8rem" }}>
                ¿Olvidaste tu contraseña?
              </small>
            </div>
            <div style={{ textAlign: "left", marginTop: 30 }}>
              <small>¿No tienes una cuenta?</small>{" "}
              <RegisterBtn onClick={() => navigate("/register")}>
                REGISTRARSE
              </RegisterBtn>
            </div>
            <div style={{ textAlign: "left", marginTop: 30 }}>
              <a>Inicia sesión con tus redes sociales</a>
            </div>
            <SocialButtons>
              <button className="google">
                <img src={googleIMG} width={22} height={23} />
              </button>
              <button className="facebook">
                <img src={facebookIMG} width={22} height={23} />
              </button>
              <button className="apple">
                <img src={appleIMG} width={22} height={23} />
              </button>
            </SocialButtons>
          </FormContainer>
        </RightSection>
      </MainContent>
    </Container>
  );
};

export default LoginPage;
