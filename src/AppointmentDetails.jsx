import React, { useEffect, useState } from 'react';
import { getAppointments, deleteAppointment } from './AppointmentService';
import { Link, useNavigate } from 'react-router-dom';

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  console.log(user);

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

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta cita?')) return;
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(a => a.appointmentId !== id));
    } catch (err) {
      console.error('Error al eliminar cita:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div>
      <h3>Citas disponibles</h3>
      {appointments.length === 0 ? (
        <p>No hay citas registradas.</p>
      ) : (
        <ul className="list-group">
          {appointments.map(a => (
            <li key={a.appointmentId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-info me-2">#{a.appointmentId}</span>
<strong>{a.clientName}</strong>
                <strong>{a.clientName}</strong> — {new Date(a.date).toLocaleString()}
                <br />
                Estado: <span className="badge bg-secondary">{a.status}</span>
              </div>
              <div>
                {user?.user !== 'vigilancia' && (
                  <Link to={`/appointments/edit/${a.appointmentId}`} className="btn btn-sm btn-primary me-2">
                    Modificar
                  </Link>
                )}
                {user?.user !== 'vigilancia' && (
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.appointmentId)}>
                    Eliminar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentDetails;