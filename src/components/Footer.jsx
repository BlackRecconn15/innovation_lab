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
`;

const Footer = () => {
  return (
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
  );
};

export default Footer;
