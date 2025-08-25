import axios from 'axios';

const API_URL = 'http://localhost/AppointmentsAPI/api/Login';
const API_URL_APPOINTMENTS = 'http://localhost/AppointmentsAPI/api/appointments/getall';
export const login = (credentials) => axios.post(API_URL, credentials);