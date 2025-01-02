import styled from "styled-components";
import PropTypes from "prop-types"; // Importa PropTypes
import { useNavigate } from "react-router-dom";
import bellIMG from "../assets/home/icons/bell-icon.png";
import cartIMG from "../assets/home/icons/cart-icon.png";
import userIMG from "../assets/home/icons/user-icon.png";
import FordIMG from "../assets/home/icons/Ford_Logo.png";
import messageIMG from "../assets/home/icons/messages.png";
import { useEffect, useState } from "react";

const HeaderContainer = styled.header`
  background-color: #d9ff00; /* Color amarillo */
  font-family: 'Inter', 'Poppins', sans-serif;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  max-width: 591px;
  height: 25px;
  outline: none;
`;

const RegisterButton = styled.button`
  margin-left: 10px;
  display: flex;
  padding: 8px 15px;
  background-color: white;
  align-items: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 42px;
  gap: 0.4rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 113px;
`;

const Icon = styled.button`
  border: none;
  background: none;
  font-size: 10px;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 20px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 15px;

  a {
    text-decoration: none;
    color: black;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si el token está presente
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <HeaderContainer>
      <TopRow>
        <Logo onClick={() => navigate("/home")}>LOGO</Logo>
        <SearchBar>
          <SearchInput placeholder="Buscar productos, marcas y más..." />
          {isAuthenticated ? (
            <RegisterButton onClick={() => navigate("/catalog")}><img src={FordIMG} width={40}/> Ford Figo</RegisterButton>
          ) : (
            <RegisterButton onClick={() => navigate("/register")}>Registra tu auto</RegisterButton>
          )}
        </SearchBar>
        <Icons>
          {isAuthenticated && <Icon><img src={messageIMG} width={18} /></Icon>}
          <Icon><img src={bellIMG} width={18} /></Icon>
          <Icon onClick={() => navigate("/shoppingcart")}><img src={cartIMG} width={18} /></Icon>
          {isAuthenticated && (
            <ProfileImage onClick={() => navigate("/Catalog")}>
              <img src={userIMG} alt="Perfil" />
            </ProfileImage>
          )}
        </Icons>
      </TopRow>

      <BottomRow>
        <NavLinks>
          <a href="#">Categorías</a>
          <a href="#">Ofertas</a>
          <a href="#">Tiendas oficiales</a>
          <a href="#">Vender</a>
          <a href="#">Marcas</a>
        </NavLinks>
        {!isAuthenticated && <LoginLink href="/login">Ingresar</LoginLink>}
      </BottomRow>
    </HeaderContainer>
  );
};

// Validación de Props con PropTypes
Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Indica si el usuario está autenticado
  userName: PropTypes.string, // Nombre del usuario (opcional)
};

export default Header;
