import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadEvents } from '../utils/storage';
import '../styles/shared.css';
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
      <header className="events-list-header">
        <h1>Eventos Disponíveis</h1>
        <button 
          className="action-button"
          onClick={() => navigate('/')}
        >
          🏠 Voltar para Home
        </button>
      </header>
      
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
                  className="view-button"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  👁️ Ver Evento
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