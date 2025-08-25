import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Opcional para estilos

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">      
      <ul className="nav-links">
        <li><NavLink to="/appointments/create">Crear cita</NavLink></li>
        <li><NavLink to="/appointments/edit">Modificar cita</NavLink></li>
        <li><NavLink to="/appointments/list">Mostrar todas</NavLink></li>
        <li><NavLink to="/appointments/search">Buscar por ID</NavLink></li>
        <li className="nav-item ms-auto">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Salir
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;