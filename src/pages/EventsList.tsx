import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadEvents, saveEvents } from '../utils/storage';
import './EventsList.css';
function EventsList() {
  const navigate = useNavigate();
  const [events] = useState(loadEvents());

  const handleEditEvent = (eventId: number) => {
    navigate(`/events?edit=${eventId}`);
  };

  return (
    <div className="events-list-container">
      <header className="events-list-header">
        <h1>Lista de Eventos</h1>
        <button 
          className="new-event-button"
          onClick={() => navigate('/events')}
        >
          + Novo Evento
        </button>
      </header>

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-list-card">
            {event.image && (
              <div className="event-list-image">
                <img src={event.image} alt={event.name} />
              </div>
            )}
            
            <div className="event-list-content">
              <h2>{event.name}</h2>
              <p className="event-list-date">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="event-list-location">{event.location}</p>
              <p className="event-list-products">
                {event.products.length} produtos
              </p>
            </div>

            <div className="event-list-actions">
              <button 
                className="edit-button"
                onClick={() => handleEditEvent(event.id)}
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