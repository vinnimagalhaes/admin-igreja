import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadEvents } from '../utils/storage';
import './EventsUser.css';

function EventsUser() {
  const navigate = useNavigate();
  const [events] = useState(loadEvents());

  return (
    <div className="events-user-container">
      <header className="events-user-header">
        <h1>Eventos Disponíveis</h1>
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
              
              <button 
                className="action-button"
                onClick={() => navigate(`/event-details/${event.id}`)}
              >
                Ver Evento
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsUser;