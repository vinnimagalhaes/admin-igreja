import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';
import './Raffles.css';

interface Raffle {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  drawDate: string;
  numbers: any[];
  prizeDescription: string;
  prizeImage: string;
}

export default function Raffles(): React.ReactElement {
  const navigate = useNavigate();
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRaffle, setNewRaffle] = useState<Raffle>({
    id: Date.now(),
    title: '',
    description: '',
    price: 0,
    image: '',
    drawDate: '',
    numbers: [],
    prizeDescription: '',
    prizeImage: ''
  });

  useEffect(() => {
    const savedRaffles = localStorage.getItem('raffles');
    if (savedRaffles) {
      setRaffles(JSON.parse(savedRaffles));
    }
  }, []);

  const handleCreateRaffle = () => {
    // Gerar números da rifa (por exemplo, de 0000 a 9999)
    const numbers = Array.from({ length: 10000 }, (_, i) => ({
      number: i.toString().padStart(4, '0'),
      status: 'available'
    }));

    const raffle = {
      ...newRaffle,
      id: Date.now(),
      numbers
    };

    const updatedRaffles = [...raffles, raffle];
    setRaffles(updatedRaffles);
    localStorage.setItem('raffles', JSON.stringify(updatedRaffles));
    setShowCreateModal(false);
  };

  return (
    <div className="raffles-container">
      <header className="raffles-header">
        <h1>Rifas</h1>
        <button 
          className="action-button"
          onClick={() => setShowCreateModal(true)}
        >
          + Nova Rifa
        </button>
      </header>

      <div className="raffles-grid">
        {raffles.map(raffle => (
          <div 
            key={raffle.id} 
            className="raffle-card"
            onClick={() => navigate(`/admin/raffles/${raffle.id}`)}
          >
            <div className="raffle-image">
              <img src={raffle.image || 'https://via.placeholder.com/300'} alt={raffle.title} />
            </div>
            <div className="raffle-info">
              <h2>{raffle.title}</h2>
              <p className="raffle-description">{raffle.description}</p>
              <p className="raffle-price">Valor: R$ {raffle.price.toFixed(2)}</p>
              <p className="raffle-date">
                Data do Sorteio: {new Date(raffle.drawDate).toLocaleDateString()}
              </p>
              <div className="raffle-stats">
                <div className="stat">
                  <span>Disponíveis</span>
                  <span>
                    {raffle.numbers.filter(n => n.status === 'available').length}
                  </span>
                </div>
                <div className="stat">
                  <span>Reservados</span>
                  <span>
                    {raffle.numbers.filter(n => n.status === 'reserved').length}
                  </span>
                </div>
                <div className="stat">
                  <span>Vendidos</span>
                  <span>
                    {raffle.numbers.filter(n => n.status === 'sold').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="create-raffle-modal">
            <h2>Nova Rifa</h2>
            <div className="form-group">
              <label>Título da Rifa</label>
              <input
                type="text"
                value={newRaffle.title}
                onChange={e => setNewRaffle({ ...newRaffle, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={newRaffle.description}
                onChange={e => setNewRaffle({ ...newRaffle, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Valor do Número</label>
              <input
                type="number"
                value={newRaffle.price}
                onChange={e => setNewRaffle({ ...newRaffle, price: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>Data do Sorteio</label>
              <input
                type="date"
                value={newRaffle.drawDate}
                onChange={e => setNewRaffle({ ...newRaffle, drawDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Imagem da Rifa</label>
              <input
                type="text"
                placeholder="URL da imagem"
                value={newRaffle.image}
                onChange={e => setNewRaffle({ ...newRaffle, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Descrição do Prêmio</label>
              <textarea
                value={newRaffle.prizeDescription}
                onChange={e => setNewRaffle({ ...newRaffle, prizeDescription: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Imagem do Prêmio</label>
              <input
                type="text"
                placeholder="URL da imagem do prêmio"
                value={newRaffle.prizeImage}
                onChange={e => setNewRaffle({ ...newRaffle, prizeImage: e.target.value })}
              />
            </div>
            <div className="modal-buttons">
              <button 
                className="cancel-button"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="confirm-button"
                onClick={handleCreateRaffle}
              >
                Criar Rifa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
