import PropTypes from "prop-types";
import styled from "styled-components";

// Contenedor principal
const BrandsGridContainer = styled.div`
  margin: 2rem 1rem 1rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 22px;
      color: black;
    }

    a {
      font-size: 14px;
      color: #0053a3;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

// Grilla de marcas
const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columnas para las tarjetas pequeñas */
  grid-template-rows: auto auto; /* Dos filas: una para las pequeñas y otra para la grande */
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Ajuste para pantallas pequeñas */
    grid-template-rows: auto; /* Solo una fila para pantallas pequeñas */
  }
`;

// Tarjeta de marca pequeña
const SmallBrandCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// Tarjeta de marca grande
const LargeBrandCard = styled.div`
  grid-column: 1 / -1; /* Abarca todas las columnas */
  grid-row: 2; /* Se posiciona en la segunda fila */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BrandList = ({ title, brands }) => {
  return (
    <BrandsGridContainer>
      {/* Header con título y enlace */}
      <div className="header">
        <h3>{title}</h3>
        <a href="#">Ver todas →</a>
      </div>

      {/* Grilla de marcas */}
      <BrandsGrid>
        {brands.map((brand, index) => {
          // La última marca será grande
          if (index === brands.length - 1) {
            return (
              <LargeBrandCard key={index}>
                <img src={brand.image} alt={brand.name} />
              </LargeBrandCard>
            );
          }

          return (
            <SmallBrandCard key={index}>
              <img src={brand.image} alt={brand.name} />
            </SmallBrandCard>
          );
        })}
      </BrandsGrid>
    </BrandsGridContainer>
  );
};

// Validación de props
BrandList.propTypes = {
  title: PropTypes.string.isRequired,
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BrandList;
