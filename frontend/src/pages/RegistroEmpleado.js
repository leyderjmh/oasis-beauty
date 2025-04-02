import React, { useState } from "react";

const RegistroEmpleado = () => {
    
  const [empleado, setEmpleado] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fotoPerfil: null,
    entidadEstudios: "",
    disponibilidadDias: [],
    disponibilidadHora: "",
    categoria: "capilares"
  });

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEmpleado({ ...empleado, fotoPerfil: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEmpleado((prev) => ({
      ...prev,
      disponibilidadDias: checked
        ? [...prev.disponibilidadDias, value]
        : prev.disponibilidadDias.filter((dia) => dia !== value)
    }));
  };

  const handleSubmit = () => {
    console.log("Registrando empleado", empleado);
    // Aquí iría la lógica para enviar los datos a la API
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Registrarse Empleado</h2>
      
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
      <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
      <input type="text" name="telefono" placeholder="Número de WhatsApp" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
      <input type="file" name="fotoPerfil" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-lg" />
      <input type="text" name="entidadEstudios" placeholder="Entidad de Estudios" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
      
      <div>
        <p>Disponibilidad de Días:</p>
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
          <label key={dia} className="block">
            <input type="checkbox" value={dia} onChange={handleCheckboxChange} /> {dia}
          </label>
        ))}
      </div>

      <div>
        <p>Disponibilidad Hora:</p>
        <label><input type="radio" name="disponibilidadHora" value="Mañana" onChange={handleChange} /> Mañana</label>
        <label><input type="radio" name="disponibilidadHora" value="Tarde" onChange={handleChange} /> Tarde</label>
      </div>

      <div>
        <p>Categoría de Servicio:</p>
        <select name="categoria" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
          <option value="capilares">Capilares</option>
          <option value="manos_pies">Manos y Pies</option>
        </select>
      </div>

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">Registrarse</button>
    </div>
  );
};

export default RegistroEmpleado;
