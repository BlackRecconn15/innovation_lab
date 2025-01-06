import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCatalog from "../components/ProductsCatalog";
import FilterMenu from "../components/Filters";
import HeaderSection from "../components/TextHeder";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import api from "../services/api";
import { useLocation } from "react-router-dom";


  // Datos de productos

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

    @media (max-width: 768px) {
      flex-direction: column;
    }

`;



const CatalogPage = () => {

    const { addToCart } = useCart(); // Accede a addToCart desde el contexto
    const location = useLocation();

    // Cuando un producto es agregado
    const handleAddToCart = (product) => {
      addToCart(product); // Agrega el producto al carrito
      toast.success(`${product.name} ha sido añadido al carrito.`); // Mensaje de confirmación
    };
    const [arrivesTomorrow, setArrivesTomorrow] = useState(false);
    const [freeShipping, setFreeShipping] = useState(false);
    const [officialStores, setOfficialStores] = useState(false);
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Extraer el término de búsqueda de la URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

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

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await api.get("/products", {
            params: { search: searchQuery },
          });
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [searchQuery]); 

    
  return (
    <Container>
      {/* Header */}
      <Header />

      <HeaderSection
        title="Catálogo de Productos"
        subtitle={
          searchQuery
            ? `Resultados para "${searchQuery}": ${products.length} encontrados`
            : `${products.length} resultados encontrados`
        }
      />

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

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ProductCatalog products={products} 
        onAddToCart={handleAddToCart}
        />
      )}

        </Container2>

        {/* Toastify container para mostrar las notificaciones */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Footer */}
        <Footer />
        </Container>
        );
    };

export default CatalogPage;
