import { useState, useEffect } from 'react';
import { loadEvents } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import '../styles/shared.css';

interface Product {
  id: number;
  name: string;
  price: number;
  maxQuantity: number;
}

interface Event {
  id: number;
  name: string;
  date: string;
  products: Product[];
}

function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const calculateTotalProducts = () => {
    return events.reduce((total, event) => total + event.products.length, 0);
  };

  const calculateTotalValue = () => {
    return events.reduce((total, event) => {
      return total + event.products.reduce((eventTotal, product) => {
        return eventTotal + (product.price * product.maxQuantity);
      }, 0);
    }, 0);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events.filter(event => new Date(event.date) >= today);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-actions">
          <button 
            className="action-button"
            onClick={() => navigate('/events-list')}
          >
            🎫 Meus Eventos
          </button>
          <button 
            className="action-button"
            onClick={() => navigate('/events-user')}
          >
            🛒 Comprar Ingressos
          </button>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Total de Eventos</h3>
            <p className="stat-value">{events.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-info">
            <h3>Total de Produtos</h3>
            <p className="stat-value">{calculateTotalProducts()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Valor Total em Produtos</h3>
            <p className="stat-value">R$ {calculateTotalValue().toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="upcoming-events">
        <h2>Próximos Eventos</h2>
        <div className="events-grid">
          {getUpcomingEvents().map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h3>{event.name}</h3>
                <span className="event-date">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <div className="event-stats">
                <div className="event-stat">
                  <span>Produtos:</span>
                  <span>{event.products.length}</span>
                </div>
                <div className="event-stat">
                  <span>Valor Total:</span>
                  <span>
                    R$ {event.products.reduce((total, product) => 
                      total + (product.price * product.maxQuantity), 0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;