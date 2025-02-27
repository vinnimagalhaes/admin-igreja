import { useParams } from 'react-router-dom';
import '../../styles/public/Checkout.css';

export default function Checkout() {
  const { eventId } = useParams();

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout do Evento</h1>
      </div>
      
      <div className="checkout-content">
        <div className="event-summary">
          <h2>Resumo do Pedido</h2>
          {/* Aqui virá o resumo dos itens selecionados */}
        </div>
        
        <div className="payment-form">
          <h2>Informações de Pagamento</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Digite seu email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <button type="submit" className="checkout-button">
              Finalizar Compra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
