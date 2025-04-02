import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log("Iniciando sesión con", credenciales);
    // Aquí irá la lógica de autenticación con la API
  };

  const handleRegister = () => {
    navigate("/registroempleado");
    // Aquí podrías redirigir a la página de registro
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión Empleado</h2>
      
      <div>
        <label className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={credenciales.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese su correo"
        />
      </div>
      
      <div>
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={credenciales.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese su contraseña"
        />
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={handleRegister}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Employees;
