import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handlePublicAccess = () => {
    navigate('/events');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bem-vindo</h1>
        </div>

        <div className="login-options">
          <button 
            className="public-access-button"
            onClick={handlePublicAccess}
          >
            🎫 Acessar Eventos
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          {!isAdmin ? (
            <button 
              className="admin-button"
              onClick={() => setIsAdmin(true)}
            >
              🔐 Área Administrativa
            </button>
          ) : (
            <form onSubmit={handleAdminLogin}>
              <h2>Login Administrativo</h2>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="seu@email.com"
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="login-button">
                Entrar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}