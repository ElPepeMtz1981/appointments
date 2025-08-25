import axios from 'axios';

const API_URL = 'http://localhost/AppointmentsAPI/api/AppointmentStatuses';

export const getStatuses = () => axios.get(`${API_URL}/getall`);