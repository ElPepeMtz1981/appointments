import React, { useEffect, useState } from 'react';
import { login } from './LoginService';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ user: '', password: '' });
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState(null);

  const navigate = useNavigate();

useEffect(() => {
    fetch('http://localhost/AppointmentsAPI/api/health/ping')
      .then(res => res.json())
      .then(data => {
        console.log('API OK:', data);
        setApiStatus(data.status);
      })
      .catch(err => {
        console.error('API no disponible:', err);
        setApiStatus('ERROR');
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      sessionStorage.setItem('user', JSON.stringify(res.data));
      navigate('/menu');
    } catch {
      setError('Credenciales inválidas');
    }
  };

return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>      
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              name="user"
              className="form-control"
              value={form.user}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
        <br />
        {apiStatus === 'OK' ? (
          <p style={{ color: 'green' }}>API funcionando ✅</p>
        ) : apiStatus === 'ERROR' ? (
          <p style={{ color: 'red' }}>Error de conexión con la API ❌</p>
        ) : (
          <p>Verificando conexión con la API...</p>
      )}
      </div>
    </div>
  );
};

export default Login;