import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentSearch from './AppointmentSearch';
import Login from './Login';
import AppContent from './AppContent';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;