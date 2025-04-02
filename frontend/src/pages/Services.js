import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from backend
    axios.get("http://127.0.0.1:8000/api/services")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{service.nombre}</h2>
            <p className="text-sm text-gray-500">{service.descripcion}</p>
            <p className="mt-2 text-lg font-bold">Precio: ${service.precio}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Agendar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
