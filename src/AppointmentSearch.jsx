import React, { useState } from 'react';
import { getAppointmentById } from './AppointmentService';

const AppointmentSearch = () => {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await getAppointmentById(id);
      setResult(res.data);
    } catch {
      setResult(null);
    }
  };

  return (
    <div>
      <h3>Buscar cita por ID</h3>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID de cita" />
      <button onClick={handleSearch}>Buscar</button>
      {result ? (
        <div>
          <p><strong>Cliente:</strong> {result.clientName}</p>
          <p><strong>Fecha:</strong> {new Date(result.date).toLocaleString()}</p>
          <p><strong>Estado:</strong> {result.status}</p>
          <p><strong>Ubicación:</strong> {result.location}</p>
          <p><strong>Notas:</strong> {result.notes}</p>
        </div>
      ) : id && <p>No se encontró la cita.</p>}
    </div>
  );
};

export default AppointmentSearch;