import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRaffle.css';
import { v4 as uuidv4 } from 'uuid';

interface RaffleForm {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  numberCount: number;
  drawDate: string;
}

export default function CreateRaffle() {
  const navigate = useNavigate();
  const [raffleForm, setRaffleForm] = useState<RaffleForm>({
    title: '',
    description: '',
    imageUrl: '',
    price: 10,
    numberCount: 100,
    drawDate: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRaffleForm(prev => ({
      ...prev,
      [name]: ['price', 'numberCount'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRaffle = {
      id: uuidv4(),
      ...raffleForm,
      numbers: Array.from({ length: raffleForm.numberCount }, (_, i) => ({
        number: String(i + 1).padStart(2, '0'),
        status: 'available'
      })),
      createdAt: new Date().toISOString()
    };
    
    // Salvar no localStorage
    const existingRaffles = JSON.parse(localStorage.getItem('raffles') || '[]');
    localStorage.setItem('raffles', JSON.stringify([...existingRaffles, newRaffle]));
    
    // Navegar para a página de detalhes da rifa
    navigate(`/admin/raffles/${newRaffle.id}`, { 
      state: { message: 'Rifa criada com sucesso!' } 
    });
  };

  return (
    <div className="create-raffle-container">
      <div className="page-header">
        <h1>Nova Rifa</h1>
      </div>

      <form className="create-raffle-form" onSubmit={handleSubmit}>
        <div className="raffle-form-card">
          <h2>Informações da Rifa</h2>
          
          <div className="form-group">
            <label>Título da Rifa</label>
            <input
              type="text"
              name="title"
              value={raffleForm.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Preço por Número (R$)</label>
              <input
                type="number"
                name="price"
                min="1"
                step="0.01"
                value={raffleForm.price}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Quantidade de Números</label>
              <input
                type="number"
                name="numberCount"
                min="10"
                max="1000"
                value={raffleForm.numberCount}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Data do Sorteio</label>
            <input
              type="date"
              name="drawDate"
              value={raffleForm.drawDate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>URL da Imagem</label>
            <input
              type="text"
              name="imageUrl"
              value={raffleForm.imageUrl}
              onChange={handleInputChange}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={raffleForm.description}
              onChange={handleInputChange}
              placeholder="Descreva os detalhes da rifa e o prêmio"
              required
            />
          </div>
        </div>
        
        <div className="form-buttons">
          <button 
            type="button" 
            className="button-secondary" 
            onClick={() => navigate('/admin/raffles')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="button-primary"
          >
            Criar Rifa
          </button>
        </div>
      </form>
    </div>
  );
} 