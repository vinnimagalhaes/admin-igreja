import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetail.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  products: Product[];
  createdAt: string;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = () => {
      try {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        const foundEvent = storedEvents.find((e: Event) => e.id === id);
        if (foundEvent) {
          setEvent(foundEvent);
          setEditedEvent(foundEvent);
        }
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingProduct(prev => prev ? {
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    } : null);
  };

  const handleSaveEvent = () => {
    if (!editedEvent) return;

    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = storedEvents.map((e: Event) => 
      e.id === editedEvent.id ? editedEvent : e
    );

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvent(editedEvent);
    setIsEditing(false);
  };

  const handleSaveProduct = () => {
    if (!editingProduct || !event) return;

    const updatedProducts = editingProduct.id
      ? event.products.map(p => p.id === editingProduct.id ? editingProduct : p)
      : [...event.products, { ...editingProduct, id: crypto.randomUUID() }];

    const updatedEvent = { ...event, products: updatedProducts };
    
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = storedEvents.map((e: Event) => 
      e.id === event.id ? updatedEvent : e
    );

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvent(updatedEvent);
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (!event) return;
    
    const confirmed = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmed) return;

    const updatedProducts = event.products.filter(p => p.id !== productId);
    const updatedEvent = { ...event, products: updatedProducts };
    
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = storedEvents.map((e: Event) => 
      e.id === event.id ? updatedEvent : e
    );

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvent(updatedEvent);
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!event) return <div className="not-found">Evento não encontrado</div>;

  return (
    <div className="event-detail-container">
      <div className="event-detail-header">
        <h1>{event.title}</h1>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar Edição' : 'Editar Evento'}
        </button>
      </div>

      <div className="event-content">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="title"
                value={editedEvent?.title}
                onChange={handleEventChange}
              />
            </div>
            
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                name="date"
                value={editedEvent?.date}
                onChange={handleEventChange}
              />
            </div>
            
            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                name="location"
                value={editedEvent?.location}
                onChange={handleEventChange}
              />
            </div>
            
            <div className="form-group">
              <label>URL da Imagem</label>
              <input
                type="text"
                name="imageUrl"
                value={editedEvent?.imageUrl}
                onChange={handleEventChange}
              />
            </div>
            
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="description"
                value={editedEvent?.description}
                onChange={handleEventChange}
              />
            </div>
            
            <button className="save-button" onClick={handleSaveEvent}>
              Salvar Alterações
            </button>
          </div>
        ) : (
          <div className="event-info">
            <div className="event-image">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.title} />
              ) : (
                <div className="image-placeholder">Sem imagem</div>
              )}
            </div>
            
            <div className="event-details">
              <p className="event-date">
                Data: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="event-location">Local: {event.location}</p>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        )}

        <div className="products-section">
          <div className="products-header">
            <h2>Produtos do Evento</h2>
            <button 
              className="add-product-button"
              onClick={() => {
                setEditingProduct({
                  id: '',
                  name: '',
                  price: 0,
                  imageUrl: '',
                  description: '',
                  type: 'Ingresso'
                });
                setShowAddProduct(true);
              }}
            >
              Adicionar Produto
            </button>
          </div>

          {(showAddProduct || editingProduct) && (
            <div className="product-form">
              <h3>{editingProduct?.id ? 'Editar Produto' : 'Novo Produto'}</h3>
              
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct?.name || ''}
                  onChange={handleProductChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Preço</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct?.price || 0}
                    onChange={handleProductChange}
                    step="0.01"
                  />
                </div>
                
                <div className="form-group">
                  <label>Tipo</label>
                  <select
                    name="type"
                    value={editingProduct?.type || 'Ingresso'}
                    onChange={handleProductChange}
                  >
                    <option value="Ingresso">Ingresso</option>
                    <option value="Comida">Comida</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={editingProduct?.imageUrl || ''}
                  onChange={handleProductChange}
                />
              </div>
              
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  value={editingProduct?.description || ''}
                  onChange={handleProductChange}
                />
              </div>
              
              <div className="form-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => {
                    setEditingProduct(null);
                    setShowAddProduct(false);
                  }}
                >
                  Cancelar
                </button>
                <button 
                  className="save-button"
                  onClick={handleSaveProduct}
                >
                  {editingProduct?.id ? 'Salvar Alterações' : 'Adicionar Produto'}
                </button>
              </div>
            </div>
          )}

          <div className="products-grid">
            {event.products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                  ) : (
                    <div className="image-placeholder">Sem imagem</div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-type">{product.type}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-actions">
                    <button
                      className="edit-button"
                      onClick={() => setEditingProduct(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 