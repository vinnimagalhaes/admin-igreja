import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadEvents } from '../utils/storage';
import './EventsList.css';

function EventsList() {
  const navigate = useNavigate();
  const [events] = useState(loadEvents());

  return (
    <div className="events-list-container">
      <header className="events-list-header">
        <h1>Lista de Eventos</h1>
        <button 
          className="action-button"
          onClick={() => navigate('/admin/events')}
        >
          + Novo Evento
        </button>
      </header>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              {event.image && <img src={event.image} alt={event.name} />}
            </div>
            
            <div className="event-content">
              <h2>{event.name}</h2>
              <p className="event-date">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-products">
                🎫 {event.products.length} produtos
              </p>
              
              <button 
                className="action-button"
                onClick={() => navigate(`/events?edit=${event.id}`)}
              >
                ✏️ Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsList;