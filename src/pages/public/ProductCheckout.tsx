import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductCheckout.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'credit' | 'cash';
}

export default function ProductCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, event } = location.state as { cart: CartItem[], event: Event };
  
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'pix'
  });

  const [loading, setLoading] = useState(false);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Aqui você implementaria a lógica de processamento do pagamento
      // Por enquanto, vamos apenas simular um sucesso após 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar o pedido no localStorage
      const order = {
        id: crypto.randomUUID(),
        eventId: event.id,
        eventTitle: event.title,
        items: cart,
        total: getTotalPrice(),
        customer: form,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Redirecionar para página de sucesso
      navigate(`/checkout/success/${order.id}`);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-checkout-container">
      <div className="checkout-content">
        <div className="checkout-header">
          <h1>Finalizar Compra</h1>
          <h2>{event.title}</h2>
          <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        </div>

        <div className="checkout-summary">
          <h3>Resumo do Pedido</h3>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.product.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span>R$ {getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Forma de pagamento</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="pix">PIX</option>
              <option value="credit">Cartão de Crédito</option>
              <option value="cash">Dinheiro</option>
            </select>
          </div>

          <div className="form-buttons">
            <button 
              type="button" 
              className="button-secondary"
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>
            <button 
              type="submit" 
              className="button-primary"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Finalizar Compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 