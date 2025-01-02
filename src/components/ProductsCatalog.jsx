import styled from 'styled-components';
import PropTypes from 'prop-types';
import startRate from "../assets/home/icons/star-fill.png"
import Images from '../config/images';

// Styled Components
const CatalogContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Contenedor de los productos
const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);  
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
  top: 11px;
  right: 20px;
  font-size: 25px;
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
  padding: 0.5rem;

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
  background-color: #f9f9f9;
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

const Advertisement = styled.div`
  grid-column: span 3; /* Hace que ocupe todo el ancho del grid */
  display: flex; /* Para centrar el contenido */
  align-items: center;
  justify-content: center;
  background-color: #d32f2f;
  color: #fff;
  padding: 0; /* Elimina padding */
  border-radius: 8px;
  overflow: hidden; /* Asegura que la imagen no desborde el contenedor */

  img {
    width: 100%; /* Ocupa todo el ancho disponible */
    height: 100%; /* Ocupa todo el alto disponible */
    object-fit: cover; /* Asegura que la imagen se ajuste correctamente */
  }
`;


// Functional Component
const ProductCatalog = ({ products, onSortChange, onAddToCart }) => {
  return (
    <CatalogContainer>
      {/* Header with sort filter */}
      <Header>
        <span>Ordenar por:</span>
        <SortSelect onChange={(e) => onSortChange(e.target.value)}>
          <option value="lowest-price">Menor precio</option>
          <option value="highest-price">Mayor precio</option>
          <option value="best-rating">Mejor calificación</option>
        </SortSelect>
      </Header>

      {/* Product Grid */}
      <ProductsGrid>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            onClick={() => onAddToCart(product)} // Evento para agregar al carrito
          >
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

        {/* Advertisement Section */}
        <Advertisement>
          <img src={Images.brands.brand6} alt="Ad" />
        </Advertisement>
      </ProductsGrid>
    </CatalogContainer>
  );
};

// PropTypes for validation
ProductCatalog.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      oldPrice: PropTypes.string,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSortChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCatalog;
