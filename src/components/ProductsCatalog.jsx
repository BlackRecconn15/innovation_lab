import styled from 'styled-components';
import PropTypes from 'prop-types';
import startRate from "../assets/home/icons/star-fill.png";
import Images from '../config/images';

// Styled Components
const CatalogContainer = styled.div`
  width: fit-content;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Diseño original de 4 columnas */
  gap: 1.5rem;
  padding: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* Cambiar a 3 columnas en tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Cambiar a 2 columnas en móviles */
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border-color: #0053a3;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 28px;
  right: 24px;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #e63946;
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    font-size: 20px;
  }
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;

  .sku {
    font-size: 12px;
    color: #666;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    
    .sku {
      font-size: 8px;
      color: #666;
      font-weight: bold;
    }
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
    border-radius: 15px;
    padding: 0.25rem 0.5rem;
    font-size: 12px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .rating-icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const ProductTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #333;
  line-height: 1.3;
`;

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

const Advertisement = styled.div`
  grid-column: span 4; /* Ocupa todo el ancho en diseño de 4 columnas */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d32f2f;
  color: #fff;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    grid-column: span 3; /* Ajusta a 3 columnas en tablets */
  }

  @media (max-width: 768px) {
    grid-column: span 2; /* Ajusta a 2 columnas en móviles */
  }
`;

const ProductCatalog = ({ products, onSortChange, onAddToCart }) => {
  return (
    <CatalogContainer>
      <Header>
        <span>Ordenar por:</span>
        <SortSelect onChange={(e) => onSortChange(e.target.value)}>
          <option value="lowest-price">Menor precio</option>
          <option value="highest-price">Mayor precio</option>
          <option value="best-rating">Mejor calificación</option>
        </SortSelect>
      </Header>

      <ProductsGrid>
        {products.map((product, index) => (
          <ProductCard key={index} onClick={() => onAddToCart(product)}>
            <FavoriteIcon>♡</FavoriteIcon>
            <TopInfo>
              <span className="sku">SKU: {product.sku}</span>
            </TopInfo>
            <ProductImage src={product.image} alt={product.name} />
            <RatingDiv>
              <span className="rating">
                <img className="rating-icon" src={startRate} alt="Star" />
                {product.rating}
              </span>
            </RatingDiv>
            <ProductTitle>{product.name}</ProductTitle>
            <PriceContainer>
              {product.originalPrice && (
                <div className="original-price">{product.originalPrice}</div>
              )}
              <div className="final-price">{product.finalPrice}</div>
            </PriceContainer>
          </ProductCard>
        ))}

        <Advertisement>
          <img src={Images.brands.brand6} alt="Ad" />
        </Advertisement>
      </ProductsGrid>
    </CatalogContainer>
  );
};

ProductCatalog.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      originalPrice: PropTypes.string,
      finalPrice: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSortChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCatalog;
