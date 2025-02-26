import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChurch } from 'react-icons/fa';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    navigate('/admin/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <FaChurch size={48} color="#22c55e" />
          <h1>Paróquia N. Sra. Aparecida</h1>
          <p>Faça login para acessar o painel administrativo</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}