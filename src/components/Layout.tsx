import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChurch } from 'react-icons/fa';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/events-list', label: 'Meus Eventos', icon: '📅' },
    { path: '/admin/raffles', label: 'Rifas', icon: '🎫' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <FaChurch size={24} color="#22c55e" />
          <h2>Paróquia N. Sra. Aparecida</h2>
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

      <main className="main-content" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
        {children}
      </main>
    </div>
  );
}
