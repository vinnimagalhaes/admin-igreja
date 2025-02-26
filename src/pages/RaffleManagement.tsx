import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/shared.css';
import './RaffleManagement.css';

interface RaffleNumber {
  number: string;
  status: 'available' | 'reserved' | 'sold';
  buyerName?: string;
  buyerPhone?: string;
  paymentStatus?: 'pending' | 'confirmed';
}

interface Raffle {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  drawDate: string;
  numbers: RaffleNumber[];
  prizeDescription: string;
  prizeImage: string;
}

export default function RaffleManagement(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<RaffleNumber | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    // Carrega a rifa do localStorage
    const raffles = JSON.parse(localStorage.getItem('raffles') || '[]');
    const currentRaffle = raffles.find((r: Raffle) => r.id === Number(id));
    if (currentRaffle) {
      setRaffle(currentRaffle);
    }
  }, [id]);

  if (!raffle) {
    return (
      <div className="raffle-management-container">
        <h2>Carregando...</h2>
      </div>
    );
  }

  const handleNumberClick = (number: RaffleNumber) => {
    setSelectedNumber(number);
    setShowModal(true);
  };

  const handleStatusChange = (status: 'available' | 'reserved' | 'sold') => {
    if (selectedNumber) {
      const updatedNumbers = raffle.numbers.map(n =>
        n.number === selectedNumber.number ? { ...n, status } : n
      );
      setRaffle({ ...raffle, numbers: updatedNumbers });
      setSelectedNumber(null);
      setShowModal(false);
    }
  };

  return (
    <div className="raffle-management-container">
      <header className="raffle-management-header">
        <h1>{raffle.title}</h1>
        <div className="raffle-info">
          <p>Data do Sorteio: {new Date(raffle.drawDate).toLocaleDateString()}</p>
          <p>Valor: R$ {raffle.price.toFixed(2)}</p>
        </div>
      </header>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Buscar por número ou comprador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="status-filter"
        >
          <option value="all">Todos</option>
          <option value="available">Disponíveis</option>
          <option value="reserved">Reservados</option>
          <option value="sold">Vendidos</option>
        </select>
      </div>

      <div className="numbers-grid">
        {raffle.numbers
          .filter(number => {
            const matchesSearch = number.number.includes(searchTerm) || 
                               number.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               number.buyerPhone?.includes(searchTerm);
            const matchesFilter = filterStatus === 'all' || number.status === filterStatus;
            return matchesSearch && matchesFilter;
          })
          .map(number => (
            <div
              key={number.number}
              className={`number-card ${number.status}`}
              onClick={() => handleNumberClick(number)}
            >
              <span className="number">{number.number}</span>
              {number.buyerName && (
                <span className="buyer-name">{number.buyerName}</span>
              )}
            </div>
          ))}
      </div>

      {showModal && selectedNumber && (
        <div className="modal-overlay">
          <div className="number-modal">
            <h2>Número {selectedNumber.number}</h2>
            <div className="form-group">
              <label>Nome do Comprador</label>
              <input
                type="text"
                value={buyerInfo.name}
                onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                value={buyerInfo.phone}
                onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
              />
            </div>
            <div className="status-buttons">
              <button
                className="status-button available"
                onClick={() => handleStatusChange('available')}
              >
                Disponível
              </button>
              <button
                className="status-button reserved"
                onClick={() => handleStatusChange('reserved')}
              >
                Reservar
              </button>
              <button
                className="status-button sold"
                onClick={() => handleStatusChange('sold')}
              >
                Confirmar Venda
              </button>
            </div>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
