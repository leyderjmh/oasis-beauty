import React, { useState, useEffect } from "react";
import axios from "axios";


const AdminPanel = () => {
  
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newService, setNewService] = useState({ name: "", category: "capilar" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Obtener servicios
        const servicesResponse = await axios.get("http://127.0.0.1:8000/api/services", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(servicesResponse.data);

        // Obtener usuarios
        const usersResponse = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);

        // Obtener empleados
        const employeesResponse = await axios.get("http://127.0.0.1:8000/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error("Error al obtener datos", error);
      }
    };

    fetchData();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/services",
        newService,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setServices([...services, response.data]);
      setNewService({ name: "", category: "capilar" });
      alert("Servicio agregado correctamente");
    } catch (error) {
      console.error("Error al agregar servicio", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices(services.filter((service) => service.id !== id));
      alert("Servicio eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar servicio", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

      {/* Gestión de Servicios */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Gestión de Servicios</h2>
        <form onSubmit={handleAddService} className="mb-4">
          <input
            type="text"
            placeholder="Nombre del servicio"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="p-2 border rounded mr-2"
            required
          />
          <select
            value={newService.category}
            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
            className="p-2 border rounded mr-2"
          >
            <option value="capilar">Capilar</option>
            <option value="manos_pies">Manos y Pies</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar</button>
        </form>

        <ul>
          {services.map((service) => (
            <li key={service.id} className="border p-2 flex justify-between">
              {service.name} - {service.category}
              <button onClick={() => handleDeleteService(service.id)} className="bg-red-500 text-white p-2 rounded">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Visualización de Usuarios */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border p-2">
              {user.name} - {user.email} - {user.whatsapp}
            </li>
          ))}
        </ul>
      </section>

      {/* Visualización de Empleados */}
      <section>
        <h2 className="text-xl font-semibold">Empleados Registrados</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} className="border p-2">
              {employee.name} - {employee.email} - {employee.whatsapp} - {employee.days_available.join(", ")}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;

