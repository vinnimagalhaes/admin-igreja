import { useState, useEffect } from 'react';
import { loadEvents } from '../utils/storage';
import '../styles/shared.css';
import './Dashboard.css';

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
  description: string;
  location: string;
  image: string;
  products: Product[];
}

function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const calculateTotalProducts = () => {
    return events.reduce((total, event) => total + event.products.length, 0);
  };

  const calculateTotalValue = () => {
    let total = 0;
    events.forEach(event => {
      event.products.forEach(product => {
        // Garantir que os valores são números válidos
        const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
        const quantity = typeof product.maxQuantity === 'number' ? product.maxQuantity : parseFloat(product.maxQuantity) || 0;
        total += price * quantity;
      });
    });
    return total;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events.filter(event => new Date(event.date) >= today);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
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
            <p className="stat-value">
              R$ {calculateTotalValue().toLocaleString('pt-BR', { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="upcoming-events">
        <h2>Próximos Eventos</h2>
        <div className="events-grid">
          {getUpcomingEvents().map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image || '/placeholder-event.jpg'} alt={event.name} />
              </div>
              <div className="event-info">
                <h3>{event.name}</h3>
                <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="event-location">📍 {event.location}</p>
                <div className="event-stats">
                  <div className="event-stat">
                    <span>Produtos:</span>
                    <span>{event.products.length}</span>
                  </div>
                  <div className="event-stat">
                    <span>Valor Total:</span>
                    <span>
                      {(() => {
                        let eventTotal = 0;
                        event.products.forEach(product => {
                          const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
                          const quantity = typeof product.maxQuantity === 'number' ? product.maxQuantity : parseFloat(product.maxQuantity) || 0;
                          eventTotal += price * quantity;
                        });
                        return `R$ ${eventTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                      })()}
                    </span>
                  </div>
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