import { useParams } from 'react-router-dom';
import '../../styles/public/EventView.css';

export default function PublicEventView() {
  const { eventId } = useParams();
  
  // Buscar evento do localStorage
  const event = JSON.parse(localStorage.getItem('events') || '[]')
    .find((e: any) => e.id === eventId);

  if (!event) return <div>Evento não encontrado</div>;

  return (
    <div className="event-view-container">
      <div className="event-header">
        <div className="event-cover">
          <img src={event.imageUrl} alt={event.title} />
        </div>
        <div className="event-info">
          <h1>{event.title}</h1>
          <p className="event-date">{event.date}</p>
          <p className="event-location">{event.location}</p>
          <p className="event-description">{event.description}</p>
        </div>
      </div>
      
      <div className="products-section">
        <h2>Produtos Disponíveis</h2>
        <div className="products-grid">
          {event.products.map((product: any) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-type">{product.type}</p>
                <p className="product-price">R$ {product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>
                <button className="add-to-cart-button">
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}