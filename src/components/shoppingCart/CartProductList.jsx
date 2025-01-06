import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartProductItem from "./CartProductItem";
import backIcon from "../../assets/home/icons/arrow_circle_left.png";

// Styled Components
const ListContainer = styled.div`
  flex: 3;
  padding: 1rem;
  border-radius: 8px;
  margin: 3rem 1rem;

  @media (max-width: 768px) {
    display: block;
    margin: 3rem 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BackToShoppingButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  a {
    display: flex;
    gap: 16px;
    align-items: self-end;
  }

  @media (max-width: 768px) {
    display: none;
  }

`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const CartProductList = ({ products, onQuantityChange, onRemoveProduct }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    console.log("Updating quantity for:", id, "to:", quantity);
    onQuantityChange(id, quantity);
  };
  

    return (
    <ListContainer>
      {/* Header con botón de "Seguir comprando" */}
      <Header>
        <Title>Carrito de compra</Title>
      </Header>
      <BackToShoppingButton onClick={() => navigate("/catalog")}>
        <a>
          <img src={backIcon} />
          Seguir comprando
        </a>
      </BackToShoppingButton>

      {/* Renderiza productos del carrito */}
      

      {products.length > 0 ? (
      products.map((product) => (
        <CartProductItem
          key={product.id}
          product={product}
          onQuantityChange={handleQuantityChange}
          onRemoveProduct={onRemoveProduct}
        />
      ))
    ) : (
      <p>No hay productos en el carrito.</p>
    )}
    </ListContainer>
  );
};
// Validación de props
CartProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      originalPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Opcional
      finalprice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      quantity: PropTypes.number.isRequired, // Debe ser un número
      rating: PropTypes.string, // Opcional
      sku: PropTypes.string, // Opcional
      stock: PropTypes.number.isRequired,
      shippingCost: PropTypes.number,
      description: PropTypes.string
    })
  ).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};


export default CartProductList;
