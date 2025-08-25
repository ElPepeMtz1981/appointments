import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById } from './AppointmentService';
import AppointmentForm from './AppointmentForm';

const AppointmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await getAppointmentById(id);
        setSelected(res.data);
      } catch (err) {
        console.error('Error al cargar cita:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleSaved = () => {
    alert('Cita actualizada');
    navigate('/appointments/list');
  };

  if (loading) return <p>Cargando cita...</p>;
  if (!selected) return <p>No se encontró la cita con ID {id}.</p>;

  return (
    <div>
      <h3>Editar Cita</h3>
      <AppointmentForm selected={selected} onSaved={handleSaved} />
    </div>
  );
};

export default AppointmentEdit;