import PropTypes from "prop-types";
import styled from "styled-components";
import Images from "../../config/images";

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 12px;

  .actions {
    display: none;
  }

  .container3 {
    display: flex;
    flex-direction: row;
    gap: 6rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;

    .actions {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      color: #909090;
      cursor: pointer;

      .remove {
        color: #dc3545;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .favorite {
        font-size: 1.2rem;
        color: #f44336;

        &:hover {
          color: #ff6666;
        }
      }
    }
    .container3 {
      display: none;
      flex-direction: row-reverse;
    }
  }
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .sku {
    display: none;
    font-size: 0.8rem;
    color: #666;
  }

  .container2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .sku {
      display: flex;
      font-size: 0.8rem;
      color: #666;
    }

    .container2 {
      flex-direction: row;
      align-items: flex-start;
    }
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 5px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .containerMovil {
    display: none;

    .priceContainer {
      display: none;
    }

    .stockContainer {
      display: none;
    }
  }

  .name {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }

  .Controls {
    display: none;
  }

  .stock {
    display: none;
  }

  .price {
    display: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .shipping {
    display: none;
    font-size: 0.8rem;
    color: #28a745;
  }

  .actions {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #909090;
    cursor: pointer;

    .remove {
      color: #dc3545;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .favorite {
      font-size: 1.2rem;
      color: #f44336;

      &:hover {
        color: #ff6666;
      }
    }
  }

  @media (max-width: 768px) {
    width: fit-content;

    .containerMovil {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;

      .priceContainer {
        display: flex;
        flex-direction: column;
      }

      .stockContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .actions {
      display: none;
    }

    .Controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      button {
        width: 15px;
        height: 15px;
        font-size: 0.7rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f9f9f9;
        cursor: pointer;

        &:hover {
          background-color: #e9e9e9;
        }

        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }

      span {
        font-size: 0.7rem;
        font-weight: bold;
        color: #333;
      }
    }

    .stock {
      display: flex;
      font-size: 0.8rem;
      color: #666;
    }

    .price {
      display: flex;
      font-size: 0.8rem;
      font-weight: bold;
      color: #333;
    }

    .shipping {
      display: flex;
      font-size: 0.5rem;
      color: #28a745;
    }
  }
`;

const QuantityControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .Controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      width: 30px;
      height: 30px;
      font-size: 1.2rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
      cursor: pointer;

      &:hover {
        background-color: #e9e9e9;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    span {
      font-size: 1rem;
      font-weight: bold;
      color: #333;
    }
  }

  .stock {
    font-size: 0.8rem;
    color: #666;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .shipping {
    font-size: 0.8rem;
    color: #28a745;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const CartProductItem = ({ product, onQuantityChange, onRemoveProduct }) => {
  const handleIncrease = () => {
    if (product.quantity < product.stock) {
      onQuantityChange(product.id, product.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
    }
  };



  console.log(product.stock);

  return (
    <ProductContainer>
      <ProductDetails>
        <div className="sku">SKU: {product.sku}</div>
        <div className="container2">
          <ProductImage src={Images.productos[product.image_url]} alt={product.name} />
          <ProductInfo>
            <div className="name">{product.name}</div>
            <div className="actions">
              <span
                className="remove"
                onClick={() => onRemoveProduct(product.id)}
              >
                Eliminar
              </span>
              <span className="favorite">♡</span>
            </div>
            <div className="containerMovil">
              <div className="priceContainer">
                <div className="price">
                  ${(product.finalprice * product.quantity).toFixed(2)} MXN
                </div>
                <div className="shipping">
                  {product.quantity > 2
                    ? "Sin cargo por envío"
                    : "Cargo por envío $234"}
                </div>
              </div>
              <div className="stockContainer">
                <div className="Controls">
                  <button
                    onClick={handleDecrease}
                    disabled={product.quantity === 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={handleIncrease}
                    disabled={product.quantity === product.stock}
                  >
                    +
                  </button>
                </div>
                <div className="stock">{product.stock} disponibles</div>
              </div>
            </div>
          </ProductInfo>
        </div>
      </ProductDetails>
      <div className="container3">
        <QuantityControl>
          <div className="Controls">
            <button onClick={handleDecrease} disabled={product.quantity === 1}>
              -
            </button>
            <span>{product.quantity}</span>
            <button
              onClick={handleIncrease}
              disabled={product.quantity === product.stock}
            >
              +
            </button>
          </div>
          <div className="stock">{product.stock} disponibles</div>
        </QuantityControl>

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
      </div>
      <div className="actions">
        <span className="remove" onClick={() => onRemoveProduct(product.id)}>
          Eliminar
        </span>
        <span className="favorite">♡</span>
      </div>
    </ProductContainer>
  );
};

// Validación de props
CartProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    finalprice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};

export default CartProductItem;
