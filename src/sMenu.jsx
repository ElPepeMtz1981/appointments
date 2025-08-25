import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h2>Appointment Menu</h2>
      <ul>
        <li><Link to="/appointments/create">Crear cita</Link></li>
        <li><Link to="/appointments/edit">Modificar cita</Link></li>
        <li><Link to="/appointments/list">Mostrar todas las citas</Link></li>
        <li><Link to="/appointments/search">Buscar cita por ID</Link></li>
      </ul>
    </div>
  );
};

export default Menu;