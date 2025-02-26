import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Corrigindo a importação
import './RaffleCheckout.css';

interface Raffle {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function RaffleCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Aqui buscaríamos os dados da rifa pelo ID
    // Por enquanto, vamos simular uma rifa
    setRaffle({
      id: id || '1',
      title: 'Rifa Beneficente',
      price: 10,
      image: 'https://via.placeholder.com/400',
      description: 'Rifa beneficente para a Paróquia'
    });
    
    // Aqui também poderíamos buscar os números selecionados de um armazenamento temporário
    // Por enquanto, vamos simular a seleção de alguns números
    setSelectedNumbers(['01', '15', '27']);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleFinishPurchase = () => {
    // Aqui enviaríamos os dados para o servidor
    alert('Compra finalizada! Obrigado pela participação.');
    navigate('/');
  };

  const totalAmount = selectedNumbers.length * (raffle?.price || 0);
  
  // Simula um código PIX 
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000";

  if (!raffle) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout da Rifa</h1>
      </div>

      <div className="checkout-content">
        <div className="raffle-summary">
          <img src={raffle.image} alt={raffle.title} className="raffle-image" />
          <div className="raffle-details">
            <h2>{raffle.title}</h2>
            <p className="raffle-description">{raffle.description}</p>
            <div className="selected-numbers">
              <p>Números selecionados:</p>
              <div className="number-list">
                {selectedNumbers.map(num => (
                  <span key={num} className="selected-number">{num}</span>
                ))}
              </div>
            </div>
            <p className="price-summary">
              <span>{selectedNumbers.length} número(s) x R$ {raffle.price.toFixed(2)}</span>
              <span className="total-amount">Total: R$ {totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {step === 1 ? (
          <div className="buyer-info-form">
            <h3>Informações do Comprador</h3>
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="name"
                value={buyerInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={buyerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="phone"
                value={buyerInfo.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="checkout-button" onClick={handleNextStep}>
              Continuar para Pagamento
            </button>
          </div>
        ) : (
          <div className="payment-section">
            <h3>Pagamento via PIX</h3>
            <p className="payment-instructions">
              Escaneie o QR Code abaixo com o app do seu banco para pagar via PIX. 
              Após o pagamento, seu número será reservado automaticamente.
            </p>
            
            <div className="qr-code-container">
              <QRCodeSVG value={pixCode} size={200} />
            </div>
            
            <div className="pix-copy">
              <p>Ou copie o código PIX:</p>
              <div className="pix-code">
                <input type="text" value={pixCode} readOnly />
                <button onClick={() => navigator.clipboard.writeText(pixCode)}>
                  Copiar
                </button>
              </div>
            </div>
            
            <div className="payment-buttons">
              <button 
                className="back-button" 
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button 
                className="finish-button" 
                onClick={handleFinishPurchase}
              >
                Confirmar Pagamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 