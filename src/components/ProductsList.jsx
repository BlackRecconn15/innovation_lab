import PropTypes from "prop-types";
import styled from "styled-components";
import startRate from "../assets/home/icons/star-fill.png"

// Contenedor de los productos
const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));  
    gap: 1rem;
    padding: 1.5rem;
`;

// Tarjetas de productos
const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: left;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border-color: #0053a3;
  }
`;

// Icono de "Favorito"
const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #e63946;
  }
`;

// Contenedor del SKU y Rating
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .sku {
    font-size: 12px;
    color: #666;
    font-weight: bold;
  }
`;

const RatingDiv = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-top: 0.5rem;

  .rating {
    display: flex;
    align-items: center;
    background-color: #d9ff00;
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }

  .rating-icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
`;

// Imagen del producto
const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

// Título del producto
const ProductTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #333;
  line-height: 1.3;
`;

// Contenedor de precios
const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  .original-price {
    font-size: 12px;
    color: #999;
    text-decoration: line-through red;
    margin-bottom: 0.25rem;
  }

  .final-price {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  
`;



// Contenedor principal
const ProductList = ({ title, products }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2rem 1rem 1rem",
        }}
      >
        <h3 style={{ fontSize: "22px", color: "#333" }}>{title}</h3>
        <a
          href="#"
          style={{
            fontSize: "14px",
            color: "#222",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Ver todas →
        </a>
      </div>
      <ProductsGrid>
        {products.map((product, index) => (
          <ProductCard key={index}>
            {/* Icono de favorito */}
            <FavoriteIcon>♡</FavoriteIcon>

            {/* SKU y Rating */}
            <TopInfo>
              <span className="sku">SKU: {product.sku}</span>
            </TopInfo>

            {/* Imagen del producto */}
            <ProductImage src={product.image} alt={product.name} />

            {/* Rating */}
            <RatingDiv>
              <span className="rating">
                <img className="rating-icon" src={startRate} alt="Star" />
                {product.rating}
              </span>
            </RatingDiv>

            {/* Título del producto */}
            <ProductTitle>{product.name}</ProductTitle>

            {/* Precios */}
            <PriceContainer>
              {product.originalPrice && (
                <div className="original-price">{product.originalPrice}</div>
              )}
              <div className="final-price">{product.finalPrice}</div>
            </PriceContainer>
          </ProductCard>
        ))}
      </ProductsGrid>
    </>
  );
};

// Validación de props
ProductList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      finalPrice: PropTypes.string.isRequired,
      originalPrice: PropTypes.string,
      sku: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductList;
