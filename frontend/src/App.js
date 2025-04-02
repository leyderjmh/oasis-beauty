import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Services from "./pages/Services";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import Configuration from "./pages/Configuration";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Hola Bienvenido a *Oasis Beauty*</h1>} />
          <Route path="/services" element={<Services />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/configuracion" element={<Configuration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

