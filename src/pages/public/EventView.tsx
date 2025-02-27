import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventView.css';

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
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function EventView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = () => {
      try {
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

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Adicione itens ao carrinho para continuar');
      return;
    }
    navigate(`/events/${id}/checkout`, { state: { cart, event } });
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!event) return <div className="not-found">Evento não encontrado</div>;

  return (
    <div className="event-view-container">
      <div className="event-header">
        <div className="event-cover">
          {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
        </div>
        <div className="event-info">
          <h1>{event.title}</h1>
          <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
          <p className="event-location">{event.location}</p>
          <p className="event-description">{event.description}</p>
        </div>
      </div>

      <div className="products-section">
        <h2>Produtos Disponíveis</h2>
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
                <button 
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="cart-section">
          <h2>Carrinho</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p>R$ {item.product.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(item.product.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 