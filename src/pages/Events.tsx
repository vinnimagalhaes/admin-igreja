import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveEvents, loadEvents } from '../utils/storage';
import './Events.css';

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

interface NewEventForm {
  name: string;
  date: string;
  description: string;
  location: string;
  image: string;
}

function Events() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editEventId = queryParams.get('edit');
  
  const [events, setEvents] = useState(loadEvents());
  const [currentEvent, setCurrentEvent] = useState({
    id: Date.now(),
    name: '',
    date: '',
    description: '',
    location: '',
    image: '',
    products: []
  });

  useEffect(() => {
    if (editEventId) {
      const eventToEdit = events.find(e => e.id === Number(editEventId));
      if (eventToEdit) {
        setCurrentEvent(eventToEdit);
      }
    } else {
      // Se não estiver editando, cria um novo evento
      setCurrentEvent({
        id: Date.now(),
        name: '',
        date: '',
        description: '',
        location: '',
        image: '',
        products: []
      });
    }
  }, [editEventId, events]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: currentEvent.id,
      name: currentEvent.name,
      date: currentEvent.date,
      description: currentEvent.description,
      location: currentEvent.location,
      image: currentEvent.image,
      products: currentEvent.products
    };

    if (editEventId) {
      setEvents(events.map(e => e.id === Number(editEventId) ? event : e));
    } else {
      setEvents([...events, event]);
    }

    setCurrentEvent({
      id: Date.now(),
      name: '',
      date: '',
      description: '',
      location: '',
      image: '',
      products: []
    });
    navigate('/events-list');
  };

  const handleAddProduct = (eventId: number) => {
    if (!newProduct.name || !newProduct.price || !newProduct.maxQuantity) return;

    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          products: [...event.products, {
            id: Date.now(),
            name: newProduct.name,
            price: Number(newProduct.price),
            maxQuantity: Number(newProduct.maxQuantity),
            category: newProduct.category,
            description: newProduct.description,
            image: newProduct.image
          }]
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setNewProduct({
      name: '',
      price: '',
      maxQuantity: '',
      category: 'other',
      description: '',
      image: ''
    });
  };

  const handleDeleteProduct = (eventId: number, productId: number) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          products: event.products.filter(product => product.id !== productId)
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleFinishEvent = (eventId: number) => {
    saveEvents(events);
    navigate('/events-list');
  };

  return (
    <div className="events-container">
      <header className="events-header">
        <h1>Gerenciar Eventos</h1>
        <button 
          className="new-event-button"
          onClick={() => setShowNewEventForm(true)}
        >
          + Criar Novo Evento
        </button>
      </header>

      {showNewEventForm && (
        <div className="new-event-form">
          <form onSubmit={handleCreateEvent}>
            <div className="form-group">
              <label>Nome do Evento</label>
              <input
                type="text"
                value={currentEvent.name}
                onChange={(e) => setCurrentEvent({...currentEvent, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={currentEvent.date}
                onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={currentEvent.description}
                onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                required
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                value={currentEvent.location}
                onChange={(e) => setCurrentEvent({...currentEvent, location: e.target.value})}
                required
                placeholder="Ex: Rua Example, 123"
              />
            </div>

            <div className="form-group">
              <label>Imagem (URL)</label>
              <input
                type="url"
                value={currentEvent.image}
                onChange={(e) => setCurrentEvent({...currentEvent, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
              {currentEvent.image && (
                <div className="image-preview">
                  <img src={currentEvent.image} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/events-list')}
              >
                Cancelar
              </button>
              <button type="submit" className="create-button">
                {editEventId ? 'Salvar Alterações' : 'Criar Evento'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Events;