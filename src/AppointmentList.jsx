import React, { useEffect, useState } from 'react';
import { getAppointments } from './AppointmentService';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error('Error al obtener citas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div>
      <h3>Listado de Citas</h3>
      {appointments.length === 0 ? (
        <p>No hay citas registradas.</p>
      ) : (
        <ul className="list-group">
          {appointments.map(a => (
            <li key={a.appointmentId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-info me-2">CITA # {a.appointmentId}</span>
                <strong>{a.clientName}</strong>
                <br/>
                <strong>{a.clientName}</strong> — {new Date(a.date).toLocaleString()}  
                <br />
                Estado: <span className="badge bg-secondary">{a.status}</span>
              </div>              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;