import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import bellIMG from "../assets/home/icons/bell-icon.png";
import cartIMG from "../assets/home/icons/cart-icon.png";
import userIMG from "../assets/home/icons/user-icon.png";
import FordIMG from "../assets/home/icons/Ford_Logo.png";
import messageIMG from "../assets/home/icons/messages.png";
import MenuIcon from "../assets/home/icons/menu.png";
import markIMG from "../assets/home/icons/mark.png";
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 20px;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    margin: 0;
    align-items: center;
    gap: 10px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  max-width: 591px;
  height: 25px;
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 20px;
  }
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

  @media (max-width: 768px) {
    display: none;
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 113px;

  @media (max-width: 768px) {
    display: none;
    margin-right: 0;
  }
`;

const IconsMovil = styled.div`
  display: none;
  @media (max-width: 768px) {
      display: flex;
      margin-right: 0;
    }
`;

const Icon = styled.button`
  border: none;
  background: none;
  font-size: 10px;
  cursor: pointer;

  .menuMovil{
    display:none;
  }
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

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
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

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    font-size: 12px;
  }
`;

const CPButton = styled.button`
display: none;

@media (max-width: 768px) {
   display: flex;
  margin-top: 5px;
  background-color: transparent;
  align-content: center;
  color: #000;
  padding: 5px 10px;
  margin-left: 1rem;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
}
`;

const LoginLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <HeaderContainer>
      <TopRow>
        <Logo onClick={() => navigate("/home")}>LOGO</Logo>
        <SearchBar>
        <IconsMovil onClick={() => navigate("/home")}><img src={MenuIcon} width={18} alt="Notificaciones" /></IconsMovil>
          <SearchInput placeholder="Buscar productos, marcas y más..." />
          <IconsMovil><img src={bellIMG} width={18} alt="Notificaciones" /></IconsMovil>
          <IconsMovil onClick={() => navigate("/shoppingcart")}><img src={cartIMG} width={18} alt="Carrito" /></IconsMovil>
          {isAuthenticated ? (
            <RegisterButton onClick={() => navigate("/catalog")}>
              <img src={FordIMG} width={40} alt="Ford" /> Ford Figo
            </RegisterButton>
          ) : (
            <RegisterButton onClick={() => navigate("/register")}>Registra tu auto</RegisterButton>
          )}
        </SearchBar>
        <Icons>
          {isAuthenticated && <Icon><img src={messageIMG} width={18} alt="Mensajes" /></Icon>}
          <Icon><img src={bellIMG} width={18} alt="Notificaciones" /></Icon>
          <Icon onClick={() => navigate("/shoppingcart")}><img src={cartIMG} width={18} alt="Carrito" /></Icon>
          {isAuthenticated && (
            <ProfileImage onClick={() => navigate("/Catalog")}>
              <img src={userIMG} alt="Perfil" />
            </ProfileImage>
          )}
        </Icons>
      </TopRow>
        <div>
          <CPButton onClick={() => navigate("/catalog")}><img src={markIMG} width={6} style={{marginRight: '5px', marginTop: '2px'}}/>Enviar a CP 42010</CPButton>
        </div>

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

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

export default Header;
