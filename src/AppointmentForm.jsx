import React, { useState, useEffect } from 'react';
import { getClients } from './ClientService';
import { createAppointment, updateAppointment } from './AppointmentService';
import { getStatuses } from './StatusService';

const AppointmentForm = ({ selected, onSaved }) => {
  const [clients, setClients] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log('Selected:', selected);
  
  /*   useEffect(() => {
  getStatuses().then(res => setStatuses(res.data));
  if (selected) setForm(selected);
}, [selected]);
 */

  const [form, setForm] = useState({
    clientId: '',
    userId: user?.userId || '',
    date: '',
    statusId: '',
    location: '',
    notes: ''
  });

useEffect(() => {
  getStatuses().then(res => setStatuses(res.data));
  getClients().then(res => setClients(res.data));
}, []);

useEffect(() => {
  if (selected && clients.length > 0 && statuses.length > 0) {
    const client = clients.find(c => c.name === selected.clientName);
    const status = statuses.find(s => s.name === selected.status);

    console.log('client:', client);
    console.log('status:', status);

    setForm({
      clientId: client?.clientId ?? '',
      userId: selected.userId ?? user?.userId ?? '',
      date: selected.date ?? '',
      statusId: status?.statusId ?? '',
      location: selected.location ?? '',
      notes: selected.notes ?? ''
    });
  }
}, [selected, clients, statuses, user?.userId]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      await updateAppointment(selected.appointmentId, form);
      alert('✅ Cita actualizada correctamente');
    } else {
      await createAppointment(form);
      alert('✅ Cita creada correctamente');
    }
    onSaved();
    setForm({ clientId: '', userId: '', date: '', statusId: '', location: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="clientId" value={form.clientId} onChange={handleChange} required>
        <option value="">Seleccionar Cliente</option>
        {clients.map(c => (
          <option key={c.clientId} value={c.clientId}>
            {c.name} - {c.company}
          </option>
        ))}
      </select>
      <br/>
      <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
      <br/>
      <select name="statusId" value={form.statusId} onChange={handleChange} required>
  <option value="">Seleccionar Estatus</option>
  {statuses.map(s => (
    <option key={s.statusId} value={s.statusId}>
      {s.name}
    </option>
  ))}
</select>
<br/>
      <input name="location" value={form.location} onChange={handleChange} placeholder="Ubicación" required />
      <br/>
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Comentarios" />
      <br/>
      <button type="submit">{selected ? 'Actualizar' : 'Crear'} Cita</button>
    </form>
  );
};

export default AppointmentForm;