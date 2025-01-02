import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado inicial: usuario no autenticado

  const login = (userData) => {
    setUser(userData); // Establecer datos del usuario al iniciar sesión
  };

  const logout = () => {
    setUser(null); // Limpiar datos del usuario al cerrar sesión
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Validación de PropTypes
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Asegura que se pase al menos un elemento hijo
};
