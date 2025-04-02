import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Layout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role") === "admin");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
        setIsAdmin(localStorage.getItem("role") === "admin");
        setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  // 🔹 Disparar evento para actualizar `Layout.js`
  window.dispatchEvent(new Event("storage"));

  navigate("/login");  // Redirige a la página de inicio de sesión
};
  //useEffect(() => {
    //  const role = localStorage.getItem("role");
      //setIsAdmin(role === "admin"); // Solo activará el botón si el usuario es admin
    //}, []);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between">
          <Link to="/" className="text-xl">*Oasis Beauty*</Link>
          <ul className="flex space-x-4">
            <li><Link to="/services">Servicios</Link></li>
            <li><Link to="/employees">Empleados</Link></li>
            <li><Link to="/login">Login</Link></li>
            {isAdmin && (
              <Link to="/configuracion" className="bg-blue-500 px-4 py-2 rounded">
                  Configuración
              </Link>
            )}
            {isAuthenticated && (
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded ml-4">
                    Cerrar Sesión
                </button>
            )}
            
            
          </ul>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 Oasis Beauty
      </footer>
    </div>
  );
};



export default Layout;
