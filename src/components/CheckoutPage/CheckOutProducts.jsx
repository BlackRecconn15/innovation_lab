import PropTypes from "prop-types";
import styled from "styled-components";
import Images from "../../config/images";

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 12px;

  .actionsContent{
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .actionsContent{
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0.5rem 0 0.5rem 0;
    }
  }
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-items: center;
  min-width: 600px;

  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  .priceContent {
    display: none;
    flex-direction: column;
    align-items: flex-start;

    .price {
      font-size: 1.8rem;
      font-weight: bold;
      color: #333;
    }

    .shipping {
      font-size: 0.8rem;
      color: #666;
    }
  }
  @media (max-width: 768px) {
    .priceContent {
      display: flex;
      margin-top: 0.5rem;
      align-content: flex-start;
      align-items: flex-start;

      .price {
        font-size: 1rem;
      }

      .shipping {
        color: #28a745;
      }
    }
  }
`;

const ProductName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.1rem;
  color: #909090;
  cursor: pointer;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
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

  @media (max-width: 768px) {
    display: none;
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
  
  return (
    <ProductContainer>
      {/* Detalles del producto */}
      <ProductDetails>
        <ProductImage src={Images.productos[product.image_url]} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <div className="priceContent">
            <div className="price">
              ${(product.finalprice * product.quantity).toFixed(2)}{" "}
              MXN
            </div>
            <div className="shipping">
              {product.quantity > 2
                ? "Sin cargo por envío"
                : "Cargo por envío $234"}
            </div>
          </div>
          <ProductActions>
            <span onClick={() => onRemoveProduct(product.id)}>Eliminar</span>
            <FavoriteButton>♡</FavoriteButton>
          </ProductActions>
        </ProductInfo>
      </ProductDetails>
      <div className="actionsContent">
        <span onClick={() => onRemoveProduct(product.id)}>Eliminar</span>
        <FavoriteButton>♡</FavoriteButton>
      </div>

      {/* Precio y envío */}
      <PriceContainer>
        <div className="price">
          ${(product.finalprice * product.quantity).toFixed(2)} MXN
        </div>
        <div className="shipping">
          {product.quantity > 2
            ? "Sin cargo por envío"
            : "Cargo por envío $234"}
        </div>
      </PriceContainer>
    </ProductContainer>
  );
};

// Validación de props
CheckOutProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    finalprice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
export default CheckOutProductItem;
