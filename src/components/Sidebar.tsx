import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <Link to="/admin/dashboard" className="nav-item">
          📊 Dashboard
        </Link>
        <Link to="/admin/events-list" className="nav-item">
          📅 Meus Eventos
        </Link>
        <Link to="/admin/raffles" className="nav-item">
          🎫 Rifas
        </Link>
      </nav>
    </aside>
  );
}
