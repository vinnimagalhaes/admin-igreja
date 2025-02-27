import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveEvents, loadEvents } from '../utils/storage';
import '../styles/shared.css';
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
    maxQuantity: 100,
    category: 'ticket',
    description: '',
    image: ''
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
    navigate('/admin/events-list');
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      setCurrentEvent(prev => ({
        ...prev,
        products: [...prev.products, { 
          ...newProduct, 
          id: Date.now(),
          maxQuantity: 100
        }]
      }));
      
      setNewProduct({
        id: Date.now(),
        name: '',
        price: 0,
        maxQuantity: 100,
        category: 'ticket',
        description: '',
        image: ''
      });
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setCurrentEvent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  return (
    <div className="events-container">
      <div className="event-form">
        <h2>{editEventId ? 'Editar Evento' : 'Novo Evento'}</h2>

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
          <label>URL da Imagem do Evento</label>
          <input
            type="text"
            value={currentEvent.image}
            onChange={e => setCurrentEvent({ ...currentEvent, image: e.target.value })}
          />
        </div>

        <h3>Adicionar produto</h3>
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
            value={newProduct.price || ''}
            onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
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
          <input
            type="text"
            placeholder="URL da Imagem do Produto"
            value={newProduct.image}
            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <textarea
            placeholder="Descrição do produto"
            value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button onClick={handleAddProduct}>Adicionar Produto</button>
        </div>

        <div className="form-actions">
          <button className="action-button" onClick={handleSaveEvent}>
            {editEventId ? 'Salvar Alterações' : 'Criar Evento'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Events;