import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

function Events() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editEventId = queryParams.get('edit');
  
  const [events, setEvents] = useState<Event[]>(loadEvents());
  const [currentEvent, setCurrentEvent] = useState<Event>({
    id: Date.now(),
    name: '',
    date: '',
    description: '',
    location: '',
    image: '',
    products: []
  });

  const [newProduct, setNewProduct] = useState<Product>({
    id: Date.now(),
    name: '',
    price: 0,
    maxQuantity: 0,
    category: 'ticket'
  });

  useEffect(() => {
    if (editEventId) {
      const eventToEdit = events.find(e => e.id === Number(editEventId));
      if (eventToEdit) {
        setCurrentEvent(eventToEdit);
      }
    } else {
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

  const handleSaveEvent = () => {
    const updatedEvents = editEventId
      ? events.map(e => e.id === Number(editEventId) ? currentEvent : e)
      : [...events, currentEvent];
    
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    navigate('/events-list');
  };

  const handleAddProduct = () => {
    setCurrentEvent(prev => ({
      ...prev,
      products: [...prev.products, { ...newProduct, id: Date.now() }]
    }));

    setNewProduct({
      id: Date.now(),
      name: '',
      price: 0,
      maxQuantity: 0,
      category: 'ticket'
    });
  };

  const handleDeleteProduct = (productId: number) => {
    setCurrentEvent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(e => e.id !== Number(editEventId));
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    navigate('/events-list');
  };

  return (
    <div className="events-container">
      <header className="events-header">
        <h1>{editEventId ? 'Editar Evento' : 'Novo Evento'}</h1>
      </header>

      <div className="event-form">
        <div className="form-group">
          <label>Nome do Evento</label>
          <input
            type="text"
            value={currentEvent.name}
            onChange={e => setCurrentEvent({ ...currentEvent, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            value={currentEvent.date}
            onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Local</label>
          <input
            type="text"
            value={currentEvent.location}
            onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={currentEvent.description}
            onChange={e => setCurrentEvent({ ...currentEvent, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>URL da Imagem</label>
          <input
            type="text"
            value={currentEvent.image}
            onChange={e => setCurrentEvent({ ...currentEvent, image: e.target.value })}
          />
        </div>

        <h2>Produtos</h2>
        {currentEvent.products.map(product => (
          <div key={product.id} className="product-item">
            <span>{product.name} - R$ {product.price}</span>
            <button onClick={() => handleDeleteProduct(product.id)}>Remover</button>
          </div>
        ))}

        <div className="add-product-form">
          <input
            type="text"
            placeholder="Nome do produto"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Preço"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Quantidade máxima"
            value={newProduct.maxQuantity}
            onChange={e => setNewProduct({ ...newProduct, maxQuantity: Number(e.target.value) })}
          />
          <select
            value={newProduct.category}
            onChange={e => setNewProduct({ ...newProduct, category: e.target.value as Product['category'] })}
          >
            <option value="ticket">Ingresso</option>
            <option value="food">Comida</option>
            <option value="drink">Bebida</option>
            <option value="other">Outro</option>
          </select>
          <button onClick={handleAddProduct}>Adicionar Produto</button>
        </div>

        <div className="form-actions">
          <button className="action-button" onClick={handleSaveEvent}>
            {editEventId ? 'Salvar Alterações' : 'Criar Evento'}
          </button>
          {editEventId && (
            <button className="delete-button" onClick={handleDeleteEvent}>
              Excluir Evento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;