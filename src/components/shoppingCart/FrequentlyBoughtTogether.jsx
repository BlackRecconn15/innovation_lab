import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import startRate from "../../assets/home/icons/star-fill.png";

// Styled Components
const Container = styled.div`
  background-color: #f7f7f7;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const ProductList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
`;

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
  width: 15%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border-color: #0053a3;
  }
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 23px;
  right: 22px;
  font-size: 25px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #e63946;
  }
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  margin-top: 10px;

  .sku {
    font-size: 12px;
    color: #666;
    font-weight: bold;
  }
`;

const Checkbox = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  margin-bottom: 5px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const ProductName = styled.h4`
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
    margin: 0.5rem;
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

const PlusSign = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  align-self: center;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  background-color: #fff;
  font-family: Inter;
  color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(139, 139, 139);
  }
`;

// Functional Component
const FrequentlyBoughtTogether = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };
  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[^0-9.-]+/g, "")); // Elimina caracteres no numéricos
    }
    return price; // Devuelve el número si ya está limpio
  };
  

  const totalPrice = products
    .filter((product) => selectedProducts.includes(product.id))
    .reduce((sum, product) => sum + cleanPrice(product.finalPrice), 0);

  return (
    <Container>
      <Title>Comprados juntos habitualmente</Title>
      <ProductList>
        {products.map((product, index) => (
          <React.Fragment key={product.id}>
            <ProductCard>
              <Checkbox
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleCheckboxChange(product.id)}
              />
              <FavoriteIcon>♡</FavoriteIcon>
              {/* SKU y Rating */}
              <TopInfo>
                <span className="sku">SKU: {product.sku}</span>
              </TopInfo>
              <ProductImage src={product.image} alt={product.name} />
              <RatingDiv>
                <div className="rating">
                  <img className="rating-icon" src={startRate} alt="Star" />
                  {product.rating}
                </div>
              </RatingDiv>
              <ProductName>{product.name}</ProductName>
              <PriceContainer>
                {product.oldPrice && (
                  <div className="original-price">${cleanPrice(product.originalPrice)}</div>
                )}
                <div className="final-price">${cleanPrice(product.finalPrice)}</div>
              </PriceContainer>
            </ProductCard>
            {index < products.length - 1 && <PlusSign>+</PlusSign>}
          </React.Fragment>
        ))}

        <TotalContainer>
          <TotalPrice>Precio total:</TotalPrice>
          <TotalPrice>${totalPrice.toFixed(2)} MXN</TotalPrice>
          <AddToCartButton>Agregar al carrito</AddToCartButton>
        </TotalContainer>
      </ProductList>
    </Container>
  );
};

// PropTypes for validation
FrequentlyBoughtTogether.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      finalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      oldPrice: PropTypes.string,
      rating: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FrequentlyBoughtTogether;
