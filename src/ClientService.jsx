import axios from 'axios';

const API_URL = 'http://localhost/AppointmentsAPI/api/Clients';

export const getClients = () => axios.get(`${API_URL}/getall`);