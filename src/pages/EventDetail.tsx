import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados do evento pelo ID
    const fetchEvent = () => {
      try {
        setLoading(true);
        // Buscar do localStorage
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        const foundEvent = storedEvents.find((e: Event) => e.id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
        }
      } catch (error) {
        console.error('Erro ao buscar evento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!event) {
    return (
      <div className="event-detail-container">
        <div className="not-found">
          <h2>Evento não encontrado</h2>
          <p>O evento que você está procurando não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-detail-container">
      <div className="event-detail-header">
        <h1>{event.title}</h1>
      </div>

      <div className="event-info-card">
        <div className="event-info-grid">
          <div className="event-image">
            {event.imageUrl ? (
              <img src={event.imageUrl} alt={event.title} />
            ) : (
              <div className="event-image-placeholder">
                <span>Sem imagem</span>
              </div>
            )}
          </div>
          
          <div className="event-details">
            <div className="detail-item">
              <span className="detail-label">Data:</span>
              <span className="detail-value">{new Date(event.date).toLocaleDateString()}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Local:</span>
              <span className="detail-value">{event.location}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Produtos:</span>
              <span className="detail-value">{event.products.length} produtos</span>
            </div>
            
            <div className="detail-item description">
              <span className="detail-label">Descrição:</span>
              <p className="detail-value">{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="event-products-section">
        <h2>Produtos do Evento</h2>
        
        {event.products.length === 0 ? (
          <div className="no-products">
            <p>Este evento não possui produtos.</p>
          </div>
        ) : (
          <div className="products-grid">
            {event.products.map((product) => (
              <div key={product.id} className="product-item-card">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                  ) : (
                    <div className="product-image-placeholder">
                      <span>Sem imagem</span>
                    </div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-type">{product.type}</p>
                  <p className="product-price">R$ {product.price.toFixed(2)}</p>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 