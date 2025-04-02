import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Configuration = () => {
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ nombre: "", categoria: "", descripcion: "", precio: "" });
    const [editService, setEditService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

         if (!token) {
            navigate("/login");
        } else {
            axios.get("http://127.0.0.1:8000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setUsers(res.data))
                .catch(err => console.error("Error cargando usuarios", err));

            axios.get("http://127.0.0.1:8000/api/admin/services", { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setServices(res.data))
                .catch(err => console.error("Error cargando servicios", err));
        }
    }, [navigate]);

    // Función para eliminar usuario
    const deleteUser = (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No hay token en localStorage");
            return;
        }

        axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setUsers(users.filter(user => user.id !== id)); // ✅ Eliminar usuario del estado
            alert("Usuario eliminado correctamente");
        })
        .catch(error => console.error("Error al eliminar usuario", error));
    };

    // Función para agregar un servicio
    const addService = () => {
        const token = localStorage.getItem("token");
        axios.post("http://127.0.0.1:8000/api/admin/services", newService, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setServices([...services, res.data]);
                setNewService({ nombre: "", categoria: "", descripcion: "", precio: "" });
                alert("Servicio agregado correctamente");
            })
            .catch(err => console.error("Error creando servicio", err));
    };

    // Función para eliminar servicio
    const deleteService = (id) => {
        const token = localStorage.getItem("token");

        if (!token) return console.error("No hay token en localStorage");

        axios.delete(`http://127.0.0.1:8000/api/admin/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setServices(services.filter(service => service.id !== id));
            alert("Servicio eliminado correctamente");
        })
        .catch(error => console.error("Error al eliminar servicio", error));
    };

    // Función para iniciar edición de servicio
    const startEditService = (service) => {
        setEditService(service);
    };

    // Función para guardar edición de servicio
    const saveEditService = (id) => {
        if (!editService.nombre || !editService.descripcion || !editService.precio || !editService.categoria) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        console.log("Datos enviados:", editService); // 📌 Verifica qué datos se están enviando

        const token = localStorage.getItem("token");

        axios.put(`http://127.0.0.1:8000/api/admin/services/${editService.id}`, editService, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            // ✅ Actualiza el estado de services con el servicio editado
            setServices(services.map(service => service.id === id ? res.data : service));
            // Cierra el formulario de edición si lo tienes en un modal
            setEditService(null); // Cerrar formulario
            alert("Servicio actualizado correctamente");
            window.location.reload();
        })
        .catch((error) => {  // Asegúrate de usar "error" como parámetro
            console.error("Error editando servicio", error);
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Configuración</h2>

            {/* Sección de Usuarios */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Usuarios Registrados</h3>
                <ul className="mt-2">
                    {users.map(user => (
                        <li key={user.id} className="border-b py-2 flex justify-between">
                            {user.id}{user.name} {user.email} {user.whatsapp} {user.role}
                            <button onClick={() => deleteUser(user.id)} style={{ marginLeft: "10px", color: "red" }}>
                            Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sección de Servicios */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Servicios</h3>
                <ul className="mt-2">
                    {services.map(service => (
                        <li key={service.id} className="border-b py-2 flex justify-between">
                            {service.nombre} {service.categoria} {service.descripcion} {service.precio}
                            <div>
                                <button onClick={() => startEditService(service)} className="text-blue-500 ml-2">Editar</button>
                                <button 
                                    onClick={() => deleteService(service.id)} 
                                    className="text-red-500 ml-2">
                                        Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Formulario para Agregar Servicio */}
            <div>
                <h3 className="text-xl font-semibold">Agregar Nuevo Servicio</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newService.nombre}
                    onChange={(e) => setNewService({ ...newService, nombre: e.target.value })}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={newService.descripcion}
                    onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={newService.precio}
                    onChange={(e) => setNewService({ ...newService, precio: e.target.value })}
                    className="border p-2 w-full mb-2"
                />
                <select
                    value={newService.categoria}
                    onChange={(e) => setNewService({ ...newService, categoria: e.target.value })}
                    className="border p-2 w-full mb-2"
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="capilares">Capilares</option>
                    <option value="manos_pies">Manos y Pies</option>
                </select>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addService}>
                    Agregar Servicio
                </button>
            </div>
            {/* Formulario para Editar Servicio */}
            {editService && (
                <div className="p-4 border rounded bg-gray-100">
                    <h3 className="text-xl font-semibold">Editar Servicio</h3>
                    <input 
                        type="text" 
                        value={editService.nombre} 
                        onChange={(e) => setEditService({ ...editService, nombre: e.target.value })} 
                        className="border p-2 w-full mb-2" 
                    />

                    <select 
                        value={editService.categoria} 
                        onChange={(e) => setEditService({ ...editService, categoria: e.target.value })} 
                        className="border p-2 w-full mb-2"
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="capilares">Capilares</option>
                        <option value="manos_pies">Manos y Pies</option>
                    </select>

                    <input 
                        type="text" 
                        value={editService.descripcion} 
                        onChange={(e) => setEditService({ ...editService, descripcion: e.target.value })} 
                        className="border p-2 w-full mb-2" 
                    />
                    <input 
                        type="number" 
                        value={editService.precio} 
                        onChange={(e) => setEditService({ ...editService, precio: e.target.value })} 
                        className="border p-2 w-full mb-2" 
                    />
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        
                        onClick={saveEditService}>
                            Guardar
                    </button>
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded" 
                        onClick={() => setEditService(null)}>
                            Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Configuration;
