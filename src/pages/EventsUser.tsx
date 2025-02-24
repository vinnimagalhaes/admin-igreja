import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadEvents } from '../utils/storage';
import './EventsUser.css';

interface Product {
  id: number;
  name: string;
  price: number;
  maxQuantity: number;
  category: 'food' | 'drink' | 'ticket' | 'other';
  description?: string;
  image?: string;
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

function EventsUser() {
  const navigate = useNavigate();
  const [events] = useState<Event[]>(loadEvents());

  return (
    <div className="events-user-container">
      <h1>Eventos Disponíveis</h1>
      
      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image || '/placeholder-event.jpg'} alt={event.name} />
              </div>
              <div className="event-info">
                <h2>{event.name}</h2>
                <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">{event.description}</p>
                <button 
                  className="view-event-button"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  Ver Evento
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <span className="icon">📅</span>
            <p>Nenhum evento disponível no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsUser;