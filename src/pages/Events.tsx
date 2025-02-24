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
  const [events, setEvents] = useState<Event[]>([]);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEventForm>({
    name: '',
    date: '',
    description: '',
    location: '',
    image: ''
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    maxQuantity: '',
    category: 'other' as Product['category'],
    description: '',
    image: ''
  });

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Date.now(),
      name: newEvent.name,
      date: newEvent.date,
      description: newEvent.description,
      location: newEvent.location,
      image: newEvent.image,
      products: []
    };
    setEvents([...events, event]);
    setNewEvent({ name: '', date: '', description: '', location: '', image: '' });
    setShowNewEventForm(false);
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
                value={newEvent.name}
                onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                required
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                required
                placeholder="Ex: Rua Example, 123"
              />
            </div>

            <div className="form-group">
              <label>Imagem (URL)</label>
              <input
                type="url"
                value={newEvent.image}
                onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
              {newEvent.image && (
                <div className="image-preview">
                  <img src={newEvent.image} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowNewEventForm(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="create-button">
                Criar Evento
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h2>{event.name}</h2>
              <button 
                className="delete-event-button"
                onClick={() => handleDeleteEvent(event.id)}
              >
                🗑️
              </button>
            </div>

            <div className="event-info">
              <p className="event-date">
                <span className="icon">📅</span>
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="event-location">
                <span className="icon">📍</span>
                {event.location}
              </p>
            </div>

            {event.image && (
              <div className="event-image">
                <img src={event.image} alt={event.name} />
              </div>
            )}

            <div className="products-section">
              <h3>
                <span className="icon">🍽️</span>
                Produtos
              </h3>
              <div className="add-product">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Preço"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Quantidade disponível"
                  value={newProduct.maxQuantity}
                  onChange={(e) => setNewProduct({...newProduct, maxQuantity: e.target.value})}
                  min="1"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({
                    ...newProduct, 
                    category: e.target.value as Product['category']
                  })}
                >
                  <option value="food">Comida</option>
                  <option value="drink">Bebida</option>
                  <option value="ticket">Ingresso</option>
                  <option value="other">Outro</option>
                </select>
                <input
                  type="text"
                  placeholder="Descrição do produto"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
                <input
                  type="url"
                  placeholder="URL da imagem"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
                <button onClick={() => handleAddProduct(event.id)}>
                  <span className="icon">➕</span>
                  Adicionar
                </button>
              </div>

              <div className="products-list">
                {event.products.map(product => (
                  <div key={product.id} className="product-card">
                    {product.image && (
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    )}
                    <div className="product-info">
                      <div className="product-header">
                        <span className="product-name">{product.name}</span>
                        <span className={`product-category category-${product.category}`}>
                          {product.category === 'food' && 'Comida'}
                          {product.category === 'drink' && 'Bebida'}
                          {product.category === 'ticket' && 'Ingresso'}
                          {product.category === 'other' && 'Outro'}
                        </span>
                      </div>
                      {product.description && (
                        <p className="product-description">{product.description}</p>
                      )}
                      <div className="product-details">
                        <span className="product-quantity">
                          Disponível: {product.maxQuantity}
                        </span>
                        <span className="product-price">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <button 
                          className="delete-product-button"
                          onClick={() => handleDeleteProduct(event.id, product.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {event.products.length === 0 && (
                  <div className="no-products">
                    Nenhum produto adicionado
                  </div>
                )}
              </div>
            </div>

            <div className="event-actions">
              <button 
                className="finish-event-button"
                onClick={() => handleFinishEvent(event.id)}
              >
                ✓ Finalizar Evento
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="no-events">
            <span className="icon">📅</span>
            <p>Nenhum evento cadastrado</p>
            <button 
              className="new-event-button"
              onClick={() => setShowNewEventForm(true)}
            >
              Criar Primeiro Evento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;