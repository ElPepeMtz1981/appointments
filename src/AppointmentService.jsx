import axios from 'axios';

const API_URL = 'http://localhost/AppointmentsAPI/api/Appointments';

export const getAppointments = () => axios.get(`${API_URL}/getall`);

export const createAppointment = (data) => axios.post(`${API_URL}/create`, data);

export const updateAppointment = (id, data) => axios.put(`${API_URL}/updatebyid/${id}`, data);

export const deleteAppointment = (id) => axios.delete(`${API_URL}/deletebyid/${id}`);

export const getAppointmentById = (id) => axios.get(`${API_URL}/${id}`);
