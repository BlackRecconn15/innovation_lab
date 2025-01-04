import styled from "styled-components";
import logoIMG from "../assets/home/icons/logo.png"
import Images from "../config/images";

const FooterContainer = styled.footer`
  background-color: #f9f9f9;
  padding: 2rem 1rem;
  border-top: 1px solid #eaeaea;
  font-family: 'Inter', 'Poppins', sans-serif;

  .footer-top {
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* 5 columnas iguales */
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: 1fr; /* Una sola columna en móviles */
      text-align: center;
    }
  }

  .footer-logo {
    grid-column: span 1; /* Logo ocupa una columna */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      align-items: center;
    }

    img {
      width: 100px;
      margin-bottom: 1rem;
    }
  }

  .footer-column {
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #333;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 14px;

        a {
          color: #0053a3;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .social-icons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    a {
      font-size: 18px;
      color: #333;
      transition: color 0.2s;

      &:hover {
        color: #0053a3;
      }
    }
  }

  .footer-bottom {
    margin-top: 2rem;
    text-align: center;
    font-size: 14px;
    color: #666;

    .divider {
      margin: 1rem auto;
      height: 1px;
      background-color: #d4ff00;
      width: 50%;
    }
  }

  @media (max-width: 768px) {
      display: none;
    }
`;

// Menú de acciones para móviles
const ActionMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #eaeaea;
    padding: 0.5rem 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      cursor: pointer;
      transition: color 0.2s;

      &.active {
        color: #000;

        .indicator {
          width: 30px;
          height: 3px;
          background-color: #000;
          border-radius: 3px;
          margin-top: 0.3rem;
        }
      }

      img {
        width: 24px;
        height: 24px;
        margin-bottom: 0.3rem;
      }

      .indicator {
        width: 30px;
        height: 3px;
        background-color: transparent;
        border-radius: 3px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <div>
    <FooterContainer>
      {/* Parte superior del footer */}
      <div className="footer-top">
        {/* Logo */}
        <div className="footer-logo">
          <img src={logoIMG} alt="Logo" />
        </div>

        {/* Columnas del footer */}
        <div className="footer-column">
          <h4>Conoce más</h4>
          <ul>
            <li>
              <a href="#">Nuestra Visión</a>
            </li>
            <li>
              <a href="#">Cómo vender</a>
            </li>
            <li>
              <a href="#">Cómo comprar</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Seguridad en</h4>
          <ul>
            <li>
              <a href="#">Envíos</a>
            </li>
            <li>
              <a href="#">Formas de pago</a>
            </li>
            <li>
              <a href="#">Garantías y Devoluciones</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contáctanos</h4>
          <ul>
            <li>Teléfono: 123-456-7890</li>
            <li>
              Correo: <a href="mailto:mail@mail.com">mail@mail.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Privacidad</h4>
          <ul>
            <li>
              <a href="#">Aviso de privacidad</a>
            </li>
            <li>
              <a href="#">Términos y Condiciones</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Social</h4>
          <div className="social-icons">
            <a href="#">
              <img src={Images.social.facebook} />
            </a>
            <a href="#">
                <img src={Images.social.instagram} />
            </a>
            <a href="#">
                <img src={Images.social.linkedIn} />
            </a>
            <a href="#">
                <img src={Images.social.tiktok} />
            </a>
            <a href="#">
                <img src={Images.social.twitter} />
            </a>
          </div>
        </div>
      </div>

      {/* Parte inferior del footer */}
      <div className="footer-bottom">
        <div className="divider"></div>
        <p>Copyright 2023, All Rights Reserved</p>
      </div>
    </FooterContainer>

    
      {/* Menú de acciones para móviles */}
      <ActionMenu>
      <div className="menu-item active">
        <img src={Images.menu.home} alt="Inicio" />
        <span>Inicio</span>
        <div className="indicator"></div>
      </div>
      <div className="menu-item">
        <img src={Images.menu.stores} alt="Tiendas" />
        <span>Tiendas</span>
        <div className="indicator"></div>
      </div>
      <div className="menu-item">
        <img src={Images.menu.favorites} alt="Favoritos" />
        <span>Favoritos</span>
        <div className="indicator"></div>
      </div>
      <div className="menu-item">
        <img src={Images.menu.profile} alt="Perfil" />
        <span>Perfil</span>
        <div className="indicator"></div>
      </div>
    </ActionMenu>
    </div>

  );
};

export default Footer;
