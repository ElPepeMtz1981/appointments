import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AppointmentDetails from './AppointmentDetails'; 
import AppointmentEdit from './AppointmentEdit'
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentSearch from './AppointmentSearch';
import Login from './Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function AppContent() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('user');
  const isAuthenticated = !!user;

  const location = useLocation();
  const hideNavbar = location.pathname.toLowerCase().includes('/login') || location.pathname === '/';

  useEffect(() => {
    if (!isAuthenticated && !location.pathname.toLowerCase().includes('/login')) {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />
          
          <Route path="/appointments/create" element={
            <PrivateRoute>
              <AppointmentForm />
            </PrivateRoute>
          } />

          <Route path="/appointments/edit/:id" element={
            <PrivateRoute>
              <AppointmentEdit />
            </PrivateRoute>
          } />

          <Route path="/appointments/edit/" element={
            <PrivateRoute>
              <AppointmentDetails />
            </PrivateRoute>
          } />

          <Route path="/appointments/list" element={
            <PrivateRoute>
              <AppointmentList />
            </PrivateRoute>
          } />

          <Route path="/appointments/search" element={
            <PrivateRoute>
              <AppointmentSearch />
            </PrivateRoute>
          } />
      </Routes>
      </div>
    </>
  );
}

export default AppContent;