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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);
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
  const [numberQuantity, setNumberQuantity] = useState<number>(100);

  useEffect(() => {
    const savedRaffles = localStorage.getItem('raffles');
    if (savedRaffles) {
      setRaffles(JSON.parse(savedRaffles));
    }
  }, []);

  const handleCreateRaffle = () => {
    const numbers = Array.from({ length: numberQuantity }, (_, i) => ({
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

  const handleDeleteClick = (e: React.MouseEvent, raffle: Raffle) => {
    e.stopPropagation(); // Evita a navegação ao clicar no botão de excluir
    setSelectedRaffle(raffle);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRaffle) {
      const updatedRaffles = raffles.filter(raffle => raffle.id !== selectedRaffle.id);
      setRaffles(updatedRaffles);
      localStorage.setItem('raffles', JSON.stringify(updatedRaffles));
      setShowDeleteModal(false);
      setSelectedRaffle(null);
    }
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Rifas</h1>
        <button 
          className="action-button"
          onClick={() => setShowCreateModal(true)}
        >
          + Nova Rifa
        </button>
      </header>

      <div className="content-wrapper">
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
              <div className="raffle-header">
                <h2>{raffle.title}</h2>
                <button 
                  className="delete-button"
                  onClick={(e) => handleDeleteClick(e, raffle)}
                >
                  🗑️
                </button>
              </div>
              <p className="description">{raffle.description}</p>
              <div className="details">
                <span className="price">R$ {raffle.price.toFixed(2)}</span>
                <span className="date">{new Date(raffle.drawDate).toLocaleDateString()}</span>
              </div>
              <div className="stats">
                <div className="stat-item">
                  <span>Disponíveis</span>
                  <strong>{raffle.numbers.filter(n => n.status === 'available').length}</strong>
                </div>
                <div className="stat-item">
                  <span>Reservados</span>
                  <strong>{raffle.numbers.filter(n => n.status === 'reserved').length}</strong>
                </div>
                <div className="stat-item">
                  <span>Vendidos</span>
                  <strong>{raffle.numbers.filter(n => n.status === 'sold').length}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && selectedRaffle && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir a rifa "{selectedRaffle.title}"?</p>
            <div className="modal-buttons">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRaffle(null);
                }}
              >
                Cancelar
              </button>
              <button 
                className="delete-confirm-button"
                onClick={handleConfirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="create-raffle-modal">
            <h2>Nova Rifa</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Título da Rifa</label>
                <input
                  type="text"
                  placeholder="Ex: Rifa Beneficente"
                  value={newRaffle.title}
                  onChange={e => setNewRaffle({ ...newRaffle, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Valor do Número</label>
                <input
                  type="number"
                  placeholder="R$ 0,00"
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
                <label>Quantidade de Números</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="Ex: 1000"
                  value={numberQuantity}
                  onChange={e => setNumberQuantity(Number(e.target.value))}
                />
              </div>

              <div className="form-group full-width">
                <label>Descrição da Rifa</label>
                <textarea
                  placeholder="Descreva os detalhes da rifa..."
                  value={newRaffle.description}
                  onChange={e => setNewRaffle({ ...newRaffle, description: e.target.value })}
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
                <label>Imagem do Prêmio</label>
                <input
                  type="text"
                  placeholder="URL da imagem do prêmio"
                  value={newRaffle.prizeImage}
                  onChange={e => setNewRaffle({ ...newRaffle, prizeImage: e.target.value })}
                />
              </div>

              <div className="form-group full-width">
                <label>Descrição do Prêmio</label>
                <textarea
                  placeholder="Descreva os detalhes do prêmio..."
                  value={newRaffle.prizeDescription}
                  onChange={e => setNewRaffle({ ...newRaffle, prizeDescription: e.target.value })}
                />
              </div>
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
