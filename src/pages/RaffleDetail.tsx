import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './RaffleDetail.css';

interface RaffleNumber {
  number: string;
  status: 'available' | 'sold' | 'reserved';
  buyer?: string;
}

interface Raffle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  numberCount: number;
  drawDate: string;
  numbers: RaffleNumber[];
  createdAt: string;
}

export default function RaffleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string>('');
  
  useEffect(() => {
    // Buscar dados da rifa pelo ID
    const fetchRaffle = () => {
      try {
        setLoading(true);
        // Buscar do localStorage
        const storedRaffles = JSON.parse(localStorage.getItem('raffles') || '[]');
        const foundRaffle = storedRaffles.find((r: Raffle) => r.id === id);
        
        if (foundRaffle) {
          setRaffle(foundRaffle);
          
          // Gerar link de compartilhamento
          const baseUrl = window.location.origin;
          setShareLink(`${baseUrl}/raffles/${foundRaffle.id}/buy`);
        }
      } catch (error) {
        console.error('Erro ao buscar rifa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffle();
    
    // Verificar se há mensagem de sucesso
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => {
        setSuccessMessage(null);
        window.history.replaceState({}, document.title);
      }, 5000);
    }
  }, [id, location.state]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copiado para a área de transferência!');
  };
  
  const handleNumberClick = (number: RaffleNumber) => {
    if (!raffle || number.status !== 'available') return;
    
    // Simular reserva/venda do número
    const updatedNumbers = raffle.numbers.map(n => 
      n.number === number.number ? { ...n, status: 'reserved' } : n
    );
    
    const updatedRaffle = { ...raffle, numbers: updatedNumbers };
    
    // Atualizar localStorage
    const storedRaffles = JSON.parse(localStorage.getItem('raffles') || '[]');
    const updatedRaffles = storedRaffles.map((r: Raffle) => 
      r.id === raffle.id ? updatedRaffle : r
    );
    
    localStorage.setItem('raffles', JSON.stringify(updatedRaffles));
    setRaffle(updatedRaffle);
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!raffle) {
    return (
      <div className="raffle-detail-container">
        <div className="not-found">
          <h2>Rifa não encontrada</h2>
          <p>A rifa que você está procurando não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  // Calcular estatísticas
  const soldCount = raffle.numbers.filter(n => n.status === 'sold').length;
  const reservedCount = raffle.numbers.filter(n => n.status === 'reserved').length;
  const availableCount = raffle.numbers.filter(n => n.status === 'available').length;
  const soldValue = soldCount * raffle.price;

  return (
    <div className="raffle-detail-container">
      <div className="raffle-header">
        <h1>{raffle.title}</h1>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="raffle-content">
        <div className="raffle-info">
          <div className="raffle-image">
            {raffle.imageUrl ? (
              <img src={raffle.imageUrl} alt={raffle.title} />
            ) : (
              <div className="raffle-image-placeholder">
                <span>Sem imagem</span>
              </div>
            )}
          </div>
          
          <div className="raffle-details">
            <p className="raffle-description">{raffle.description}</p>
            
            <div className="raffle-stats">
              <div className="stat-item">
                <span className="stat-label">Preço por número</span>
                <span className="stat-value">R$ {raffle.price.toFixed(2)}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Data do sorteio</span>
                <span className="stat-value">{new Date(raffle.drawDate).toLocaleDateString()}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Números vendidos</span>
                <span className="stat-value">{soldCount} de {raffle.numberCount}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Valor arrecadado</span>
                <span className="stat-value">R$ {soldValue.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="share-section">
              <h3>Compartilhar link da rifa</h3>
              <div className="share-link">
                <input type="text" value={shareLink} readOnly />
                <button onClick={handleCopyLink}>Copiar</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="raffle-numbers-section">
          <h2>Números da Rifa</h2>
          
          <div className="numbers-legend">
            <div className="legend-item">
              <span className="legend-color available"></span>
              <span className="legend-text">Disponível ({availableCount})</span>
            </div>
            <div className="legend-item">
              <span className="legend-color reserved"></span>
              <span className="legend-text">Reservado ({reservedCount})</span>
            </div>
            <div className="legend-item">
              <span className="legend-color sold"></span>
              <span className="legend-text">Vendido ({soldCount})</span>
            </div>
          </div>
          
          <div className="raffle-numbers-container">
            {raffle.numbers.map((number) => (
              <div 
                key={number.number}
                className={`raffle-number ${number.status}`}
                onClick={() => handleNumberClick(number)}
              >
                {number.number}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 