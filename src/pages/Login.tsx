import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciais originais
    if (email === 'vinicius@gmail.com' && password === '123') {
      navigate('/admin/dashboard');
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <div className="logo">⚡️</div>
          <h1>Paróquia N. Sra. Aparecida</h1>
        </div>

        <div className="login-options">
          <button 
            className="public-access-button"
            onClick={() => navigate('/events-user')}
          >
            🎫 Ver Eventos Disponíveis
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <form onSubmit={handleLogin}>
            <h2>Acesso Administrativo</h2>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-button">
              Entrar
            </button>

            <div className="forgot-password">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                // Adicionar lógica de recuperação de senha
              }}>
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;