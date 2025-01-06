import PropTypes from "prop-types";
import styled from 'styled-components';

// Styled Components
const HeaderSectionContainer = styled.div`
  padding: 1rem 2rem;
  background-color: #f7f7f7;
  @media (max-width: 768px) {
    display:none;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0;
`;

const Breadcrumb = styled.div`
  font-size: 0.875rem;
  color: #999;

  span {
    margin-right: 0.5rem;
  }

  a {
    color: #222;
    text-decoration: none;

  }
`;

// Functional Component
const HeaderSection = ({ title, subtitle, breadcrumb }) => {
  return (
    <HeaderSectionContainer>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
      {breadcrumb && breadcrumb.length > 0 && ( // Verificación condicional
        <Breadcrumb>
          {breadcrumb.map((item, index) => (
            <span key={index}>
              {item.link ? <a href={item.link}>{item.text}</a> : item.text}
              {index < breadcrumb.length - 1 && ' > '}
            </span>
          ))}
        </Breadcrumb>
      )}</HeaderSectionContainer>
  );
};

// Validación de props
HeaderSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    breadcrumb: PropTypes.arrayOf(
        PropTypes.shape({
          link: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
  };

  HeaderSection.defaultProps = {
    breadcrumb: null, // Valor por defecto si no se pasa
  };

export default HeaderSection;
