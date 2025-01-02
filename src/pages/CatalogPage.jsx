import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCatalog from "../components/ProductsCatalog";
import FilterMenu from "../components/Filters";
import HeaderSection from "../components/TextHeder";
import Images from "../config/images";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";


  // Datos de productos
  const products = [
    {
      id: 1,
      image: Images.productos.radiador,
      name: "Radiador agricola tractor Case 580 k Aluminio/Aluminio TM",
      sku: "DCAT001980",
      rating: "4.9",
      originalPrice: "1,842",
      finalPrice: "1,542",
      quantity: 10
    },
    {
      id: 2,
      image: Images.productos.ventilador,
      name: "Aspas para ventilador Mazda B20000, B22000",
      price: "$1,842",
      sku: "DCAT001960",
      rating: "4.9",
      originalPrice: "$1,842",
      finalPrice: "$1,542",
      quantity: 10
    },
    {
      id: 3,
      image: Images.productos.escape,
      name: "Escape resonador mofle",
      price: "$1,842",
      sku: "DCAT001960",
      rating: "4.9",
      originalPrice: "$1,842",
      finalPrice: "$1,542",
      quantity: 10
    },
    {
      id: 4,
      image: Images.productos.disco,
      name: "Carter aceite Mazda 6 2.5, 20009 a 2010 aluminio",
      price: "$1,842",
      sku: "DCAT001960",
      rating: "4.9",
      originalPrice: "$1,842",
      finalPrice: "$1,542",
      quantity: 10
    },
    {
      id: 5,
      image: Images.productos.bujia,
      name: "Kit 5 Bujias Ngk Platino Vw Jetta Mk6 Bora Beetle Motor 2.5l",
      price: "$1,842",
      sku: "DCAT001960",
      rating: "4.9",
      originalPrice: "1,842",
      finalPrice: "1,542",
      quantity: 10
    },
    {
      id: 6,
        image: Images.productos.bujia,
        name: "Kit 5 Bujias Ngk Platino Vw Jetta Mk6 Bora Beetle Motor 2.5l",
        price: "$1,842",
        sku: "DCAT001960",
        rating: "4.9",
        originalPrice: "$1,842",
        finalPrice: "$1,542",
        quantity: 10
    },
    {
      id: 7,
        image: Images.productos.bujia,
        name: "Kit 5 Bujias Ngk Platino Vw Jetta Mk6 Bora Beetle Motor 2.5l",
        price: "$1,842",
        sku: "DCAT001960",
        rating: "4.9",
        originalPrice: "$1,842",
        finalPrice: "$1,542",
        quantity: 10
    },
    {
      id: 8,
        image: Images.productos.bujia,
        name: "Kit 5 Bujias Ngk Platino Vw Jetta Mk6 Bora Beetle Motor 2.5l",
        price: "$1,842",
        sku: "DCAT001960",
        rating: "4.9",
        originalPrice: "1,842",
        finalPrice: "1,542",
        quantity: 10
    },
    {
      id: 9,
        image: Images.productos.bujia,
        name: "Kit 5 Bujias Ngk Platino Vw Jetta Mk6 Bora Beetle Motor 2.5l",
        price: "$1,842",
        sku: "DCAT001960",
        rating: "4.9",
        originalPrice: "1,842",
        finalPrice: "1,542",
        quantity: 10
    },
    // Más productos...
  ];
  


const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Inter', 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
  
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: row;
`;



const CatalogPage = () => {

    const { addToCart } = useContext(CartContext); // Accede a addToCart desde el contexto

    // Cuando un producto es agregado
    const handleAddToCart = (product) => {
      addToCart(product);
    };
    const [arrivesTomorrow, setArrivesTomorrow] = useState(false);
    const [freeShipping, setFreeShipping] = useState(false);
    const [officialStores, setOfficialStores] = useState(false);
    //const [setSortOption] = useState('lowest-price');


    // State for checkboxes
    const [brands, setBrands] = useState({
      Autolite: false,
      Bosch: false,
      Champion: false,
      Denso: false,
      NGK: false,
    });
  
    const toggleCheckbox = (brand) => {
      setBrands((prev) => ({
        ...prev,
        [brand]: !prev[brand],
      }));
    };

  return (
    <Container>
      {/* Header */}
      <Header />

        <HeaderSection title="Bujia Mazda 3 de 2015" subtitle="680,896 resultados" breadcrumb={[
          { text: 'Motor', link: '#' },
          { text: 'bujías', link: '#bujias' },
        ]} />

        <Container2>

        <FilterMenu
            toggles={[
            { label: 'Llega mañana', value: arrivesTomorrow, onChange: setArrivesTomorrow },
            { label: 'Envío gratis', value: freeShipping, onChange: setFreeShipping },
            { label: 'Tiendas oficiales', value: officialStores, onChange: setOfficialStores },
            ]}
            checkboxes={[
            { label: 'Autolite', checked: brands.Autolite, onChange: () => toggleCheckbox('Autolite') },
            { label: 'Bosch', checked: brands.Bosch, onChange: () => toggleCheckbox('Bosch') },
            { label: 'Champion', checked: brands.Champion, onChange: () => toggleCheckbox('Champion') },
            { label: 'Denso', checked: brands.Denso, onChange: () => toggleCheckbox('Denso') },
            { label: 'NGK', checked: brands.NGK, onChange: () => toggleCheckbox('NGK') },
            ]}
        />

        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart} // Pasa el método como prop
        />

        </Container2>

        {/* Footer */}
        <Footer />
        </Container>
        );
    };

export default CatalogPage;
