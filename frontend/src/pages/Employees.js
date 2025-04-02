import React, { useState, useEffect } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from backend
    axios.get("http://127.0.0.1:8000/api/empleados")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
          <div key={employee.id} className="border p-4 rounded-lg shadow-md">
            <img src={employee.foto_perfil || "https://via.placeholder.com/150"} alt={employee.nombre} className="w-24 h-24 rounded-full mx-auto mb-4"/>
            <h2 className="text-xl font-semibold">{employee.nombre}</h2>
            <p className="text-sm text-gray-500">Entidad: {employee.entidad_estudios}</p>
            <p className="mt-2 text-lg font-bold">Disponibilidad: {employee.disponibilidad_dia}, {employee.disponibilidad_hora}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Ver Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
