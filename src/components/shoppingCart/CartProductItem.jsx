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

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    padding: 0.25rem 0.5rem;
    font-size: 25px;
    border: 1px solid black;
    width: 32px;
    color: #000;
    border-radius: 4px;
    cursor: pointer;
  }
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

const CartProductItem = ({ product, onQuantityChange, onRemoveProduct }) => {
  const handleIncrease = () => {
    if (product.quantity < product.stock) {
      onQuantityChange(product.id, product.quantity + 1);
    }
  };

  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.-]+/g, "")); // Elimina caracteres no numéricos
    }
    return price; // Devuelve el número si ya está limpio
  };
  

  const handleDecrease = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
    }
  };

  const price = cleanPrice(product.finalPrice);

  return (
    <ProductContainer>
      {/* Detalles del producto */}
      <ProductDetails>
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <div style={{fontSize: '0.7rem'}}>SKU: {product.sku || "N/A"}</div> {/* Añade el SKU */}
          <ProductActions>
          <span onClick={() => onRemoveProduct(product.id)}>Eliminar</span>
            <FavoriteButton>♡</FavoriteButton>
          </ProductActions>
          
        </ProductInfo>
      </ProductDetails>

      {/* Controles de cantidad */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <QuantityControl> 
        <button onClick={handleDecrease} disabled={product.quantity === 1}>
          -
        </button>
        <span>{product.quantity}</span>
        <button onClick={handleIncrease} disabled={product.quantity === product.stock}>
          +
        </button>
      </QuantityControl>
      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            {product.quantity} disponibles
          </div>
      </div>

      {/* Precio y envío */}
      <PriceContainer>
      <div className="price">${(price * product.quantity).toFixed(2)} MXN</div>
        <div className="shipping">
          {product.quantity > 2 ? 'Sin cargo por envío' : 'Cargo por envío $234'}
        </div>
      </PriceContainer>
    </ProductContainer>
  );
};

// Validación de props
CartProductItem.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      originalPrice: PropTypes.string.isRequired,
      finalPrice: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
    }).isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemoveProduct: PropTypes.func.isRequired,
  };
export default CartProductItem;
