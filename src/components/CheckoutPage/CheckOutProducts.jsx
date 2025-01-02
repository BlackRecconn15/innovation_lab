import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 12px;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-items: center;
  min-width: 600px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

`;

const ProductName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.1rem;
  color: #909090;
  cursor: pointer;
  align-items: center;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .price {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
  }

  .shipping {
    font-size: 0.8rem;
    color: #666;
  }
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ff6666;
  }
`;

const CheckOutProductItem = ({ product, onRemoveProduct }) => {

  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.-]+/g, "")); // Elimina caracteres no numéricos
    }
    return price; // Devuelve el número si ya está limpio
  };
  

  return (
    <ProductContainer>
      {/* Detalles del producto */}
      <ProductDetails>
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductActions>
            <span onClick={() => onRemoveProduct(product.id)}>Eliminar</span>
            <FavoriteButton>♡</FavoriteButton>
          </ProductActions>
          
        </ProductInfo>
      </ProductDetails>

      {/* Precio y envío */}
      <PriceContainer>
        <div className="price">${(cleanPrice(product.finalPrice) * product.quantity).toFixed(2)} MXN</div>
        <div className="shipping">
          {product.quantity > 2 ? 'Sin cargo por envío' : 'Cargo por envío $234'}
        </div>
      </PriceContainer>
    </ProductContainer>
  );
};

// Validación de props
CheckOutProductItem.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      finalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
    }).isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemoveProduct: PropTypes.func.isRequired,
  };
export default CheckOutProductItem;
