import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard', icon: '🏠' },
    { path: '/admin/events-list', label: '📅 Meus Eventos', icon: '📋' },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">⚡️</div>
          <h2>Admin Igreja</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
