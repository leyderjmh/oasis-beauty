import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token); // Save token in localStorage
        localStorage.setItem("role", response.data.user.role); // Guardamos el rol
        window.dispatchEvent(new Event("storage"));
        navigate("/"); // Redirect to home
      })
      .catch((error) => console.error("Error logging in:", error));
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Iniciar Sesión
        </button>
      </form>
      {/* Botón para redirigir a la página de registro */}
      <button
        onClick={handleRegisterRedirect}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
      >
        Registrarse
      </button>
    </div>
  );
};

export default Login;
