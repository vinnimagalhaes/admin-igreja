import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadEvents } from '../utils/storage';
import './EventDetails.css';

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

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const events = loadEvents();
    const currentEvent = events.find(e => e.id === Number(id));
    if (currentEvent) {
      setEvent(currentEvent);
    }
  }, [id]);

  if (!event) {
    return <div className="event-details-container">Evento não encontrado</div>;
  }

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: Math.max(0, Math.min(quantity, 
        event.products.find(p => p.id === productId)?.maxQuantity || 0))
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
      const product = event.products.find(p => p.id === Number(productId));
      return total + (product?.price || 0) * quantity;
    }, 0);
  };

  return (
    <div className="event-details-container">
      <div className="event-details-content">
        <div className="event-banner">
          <img src={event.image} alt={event.name} />
        </div>

        <div className="event-info">
          <h1>{event.name}</h1>
          <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
          <p className="event-location">📍 {event.location}</p>
          <p className="event-description">{event.description}</p>
        </div>

        <div className="products-section">
          <h2>Ingressos e Produtos</h2>
          <div className="products-grid">
            {event.products.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="product-price">R$ {product.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button 
                    className="quantity-button"
                    onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) - 1)}
                  >
                    -
                  </button>
                  <span>{selectedProducts[product.id] || 0}</span>
                  <button 
                    className="quantity-button"
                    onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) + 1)}
                    disabled={(selectedProducts[product.id] || 0) >= product.maxQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {calculateTotal() > 0 && (
          <div className="checkout-section">
            <div className="total">
              <h3>Total: R$ {calculateTotal().toFixed(2)}</h3>
            </div>
            <button className="checkout-button">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
