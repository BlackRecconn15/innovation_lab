import PropTypes from "prop-types";
import styled from "styled-components";

// Contenedor general
const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

// Tarjetas de categorías
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 256px;
    height: 256px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0.5rem 0;
    align-self: flex-start;
  }

  a {
    font-size: 14px;
    color: #222;
    text-decoration: none;
    align-self: flex-start;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CategoryList = ({ title, categories }) => {
  return (
    <>
      <h3 style={{ margin: "2rem 1rem 1rem", fontSize: "22px", color: "black" }}>
        {title}
      </h3>
      <CategoriesGrid>
        {categories.map((category, index) => (
          <CategoryCard key={index}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
            <a href="#">Ver todo</a>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </>
  );
};

// Validación de props
CategoryList.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryList;
