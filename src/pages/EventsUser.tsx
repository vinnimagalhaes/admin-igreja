import { useState, useEffect } from 'react';
import { loadEvents } from '../utils/storage';
import { PixQRCode } from '../components/PixQRCode';
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

interface CartItem {
  eventId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CreditCardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'credit' | 'pix' | 'cash';
  creditCard?: CreditCardDetails;
}

function EventsUser() {
  const [events, setEvents] = useState<Event[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'credit'
  });
  const [creditCard, setCreditCard] = useState<CreditCardDetails>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    const loadedEvents = loadEvents();
    console.log('Eventos carregados:', loadedEvents);
    setEvents(loadedEvents);
  }, []);

  const handleQuantityChange = (eventId: number, product: Product, quantity: number) => {
    if (quantity < 0 || quantity > product.maxQuantity) return;

    const existingItemIndex = cart.findIndex(
      item => item.eventId === eventId && item.productId === product.id
    );

    if (quantity === 0 && existingItemIndex !== -1) {
      setCart(cart.filter((_, index) => index !== existingItemIndex));
      return;
    }

    if (existingItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity = quantity;
      setCart(newCart);
    } else if (quantity > 0) {
      setCart([...cart, {
        eventId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity
      }]);
    }
  };

  const getItemQuantity = (eventId: number, productId: number) => {
    const item = cart.find(
      item => item.eventId === eventId && item.productId === productId
    );
    return item?.quantity || 0;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simula processamento do pedido
    alert(`Pedido realizado com sucesso!\nTotal: R$ ${calculateTotal().toFixed(2)}`);
    setCart([]);
    setShowCheckoutModal(false);
  };

  return (
    <div className="events-user-container">
      <header className="events-user-header">
        <h1>Eventos Disponíveis</h1>
        <div className="cart-summary">
          <span className="cart-icon">🛒</span>
          <span className="cart-total">R$ {calculateTotal().toFixed(2)}</span>
        </div>
      </header>

      <div className="events-user-list">
        {events.length === 0 ? (
          <div className="no-events-message">
            <span className="icon">📅</span>
            <p>Nenhum evento disponível no momento</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="event-user-card">
              {event.image && (
                <div className="event-image">
                  <img src={event.image} alt={event.name} />
                </div>
              )}
              
              <div className="event-user-content">
                <h2>{event.name}</h2>
                <div className="event-user-details">
                  <span className="event-user-date">
                    <span className="icon">📅</span>
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="event-user-location">
                    <span className="icon">📍</span>
                    {event.location}
                  </span>
                </div>
                <p className="event-user-description">{event.description}</p>

                <div className="products-grid">
                  {event.products.map(product => (
                    <div key={product.id} className="product-user-card">
                      {product.image && (
                        <div className="product-user-image">
                          <img src={product.image} alt={product.name} />
                        </div>
                      )}
                      <div className="product-user-info">
                        <h3>{product.name}</h3>
                        <p className="product-user-description">
                          {product.description}
                        </p>
                        <div className="product-user-price">
                          R$ {product.price.toFixed(2)}
                        </div>
                        <div className="product-user-controls">
                          <span className="product-user-available">
                            Disponível: {product.maxQuantity}
                          </span>
                          <div className="quantity-controls">
                            <button 
                              onClick={() => handleQuantityChange(
                                event.id,
                                product,
                                getItemQuantity(event.id, product.id) - 1
                              )}
                              disabled={getItemQuantity(event.id, product.id) === 0}
                            >
                              -
                            </button>
                            <span className="quantity">
                              {getItemQuantity(event.id, product.id)}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(
                                event.id,
                                product,
                                getItemQuantity(event.id, product.id) + 1
                              )}
                              disabled={getItemQuantity(event.id, product.id) === product.maxQuantity}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="checkout-button-container">
          <button 
            className="checkout-button"
            onClick={() => setShowCheckoutModal(true)}
          >
            Finalizar Compra
          </button>
        </div>
      )}

      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <h2>Finalizar Pedido</h2>
            <form onSubmit={handleCheckout}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  required
                  value={orderDetails.name}
                  onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={orderDetails.email}
                  onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="tel"
                  required
                  value={orderDetails.phone}
                  onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Forma de Pagamento</label>
                <select
                  value={orderDetails.paymentMethod}
                  onChange={(e) => setOrderDetails({
                    ...orderDetails, 
                    paymentMethod: e.target.value as OrderDetails['paymentMethod']
                  })}
                >
                  <option value="credit">Cartão de Crédito</option>
                  <option value="pix">PIX</option>
                  <option value="cash">Dinheiro</option>
                </select>
              </div>

              {orderDetails.paymentMethod === 'credit' && (
                <div className="credit-card-fields">
                  <div className="form-group">
                    <label>Número do Cartão</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      value={creditCard.number}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, '')
                          .replace(/(\d{4})/g, '$1 ')
                          .trim();
                        setCreditCard({...creditCard, number: value});
                      }}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Nome no Cartão</label>
                    <input
                      type="text"
                      placeholder="Como está no cartão"
                      value={creditCard.name}
                      onChange={(e) => setCreditCard({...creditCard, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={creditCard.expiry}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, '')
                            .replace(/(\d{2})(\d)/, '$1/$2');
                          setCreditCard({...creditCard, expiry: value});
                        }}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        value={creditCard.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setCreditCard({...creditCard, cvv: value});
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {orderDetails.paymentMethod === 'pix' && (
                <div className="pix-section">
                  <PixQRCode 
                    amount={calculateTotal()} 
                  />
                </div>
              )}

              {orderDetails.paymentMethod === 'cash' && (
                <div className="cash-section">
                  <p>Pagamento em dinheiro na entrada do evento</p>
                  <p>Total: R$ {calculateTotal().toFixed(2)}</p>
                </div>
              )}

              <div className="checkout-buttons">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowCheckoutModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-button">
                  Confirmar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsUser;