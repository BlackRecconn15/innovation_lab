import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductsList";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandsList";
import Images from "../config/images";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext"; // Importa el contexto
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


// Datos de categorías
const categories = [
    { image: Images.categorias.llanta, name: "Llantas" },
    { image: Images.categorias.freno, name: "Frenos" },
    { image: Images.categorias.rin, name: "Rines" },
    { image: Images.categorias.bateria, name: "Baterías" },
    { image: Images.categorias.asiento, name: "Asientos" },
  ];
  
  const brands = [
      { name: "Trackone", image: Images.brands.brand1 },
      { name: "Radec", image: Images.brands.brand2 },
      { name: "Totalparts", image: Images.brands.brand3 },
      { name: "Eagle", image: Images.brands.brand4 },
      { name: "Dynamik", image: Images.brands.brand5 },
      { name: "Deyac", image: Images.brands.brand6 },
    ];
  
  


const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
`;

// Banner principal con imágenes posicionadas
const MainBanner = styled.div`
  position: relative;
  background-color: #fce601;
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .tire-images {
    display: flex;
    position: absolute;
    left: 2rem; /* Ajusta según la ubicación deseada */
    top: 20%;
    transform: translateY(-50%);
    
    img {
      width: 90px; /* Ajusta el tamaño de los neumáticos */
      height: auto;
    }
  }

  .main-tire {
    width: 400px; /* Tamaño de la llanta principal */
    height: auto;
  }

  .mascot {
    position: absolute;
    right: 2rem;
    bottom: 0;
    width: 250px; /* Ajusta el tamaño de la mascota */
    height: auto;
  }
    .llanta2 {
    position: absolute;
    right: 13rem;
    top: 3rem;
    width: 300px; /* Ajusta el tamaño de la mascota */
    height: auto;
    z-index: 4
  }

  @media (max-width: 768px) {

      .tire-images{
        display: none;
      }

      .main-tire {
        display: flex;
        position: absolute;
        left: 2rem; /* Ajusta según la ubicación deseada */
        top: 40%;
        transform: translateY(-50%);
        width: 150px; /* Tamaño de la llanta principal */
        height: auto;
      }

      .mascot {
        position: absolute;
        right: -1rem;
        bottom: 0;
        width: 120px; /* Ajusta el tamaño de la mascota */
        height: auto;
      }
        .llanta2 {
        position: absolute;
        right: 4rem;
        top: 0rem;
        width: 140px; /* Ajusta el tamaño de la mascota */
        height: auto;
        z-index: 4
      }
    }
`;

const SecondaryBanner = styled.div`
  background-color: #27509b;
  text-align: center;
  color: white;
  padding: 1rem;
  font-size: 20px;
  font-weight: bold;
  z-index: 10;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Simula la autenticación (puedes usar JWT o cualquier otra lógica)
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Agrega el producto al carrito
    toast.success(`${product.name} ha sido añadido al carrito.`); // Notificación
  };
  return (
    <Container>
      {/* Header */}
      <Header isAuthenticated={isAuthenticated} />

      {/* Main Banner */}
      <MainBanner>
        <div className="tire-images">
          <img src={Images.home.llanta1} alt="Tire 1" />
          <img src={Images.home.llanta1} alt="Tire 2" />
          <img src={Images.home.llanta1} alt="Tire 3" />
        </div>
        <img
          className="main-tire"
          src={Images.home.descuento}
          alt="Main Tire"
        />
        <img className="llanta2" src={Images.home.llanta} alt="Mascot" />
        <img className="mascot" src={Images.home.michellin} alt="Mascot" />
      </MainBanner>

      {/* Secondary Banner */}
      <SecondaryBanner>
        <img
          src={Images.home.frase}
          width={500}
          alt="Encuentra la llanta adecuada para ti"
        />
      </SecondaryBanner>

        {/* Categorias */}

        <CategoryList title="Categorias" categories={categories} />

        {/* Productos */}

        <ProductList title="Ofertas" products={products} onAddToCart={handleAddToCart} />

        {/* Brands */}

        <BrandList title="Tiendas Oficiales" brands={brands} />

        {/* Productos */}

        <ProductList title="Basados en tu ultima visita" products={products} />

      {/* Footer */}
      <Footer />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
};

export default HomePage;
