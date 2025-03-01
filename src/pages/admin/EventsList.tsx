import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/shared.css';
import './EventsList.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  createdAt: string;
}

export default function EventsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Obter eventos do localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }

    // Verificar se há mensagem de sucesso da página anterior
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Limpar a mensagem após 5 segundos
      setTimeout(() => {
        setSuccessMessage(null);
        // Limpar o state da localização para evitar que a mensagem apareça novamente
        window.history.replaceState({}, document.title);
      }, 5000);
    }
  }, [location.state]);

  const formatEventDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return dateString;
    }
  };

  return (
    <div className="events-list-container">
      <div className="events-list-header">
        <h1>Meus Eventos</h1>
        <button
          className="button-primary"
          onClick={() => navigate('/admin/create-event')}
        >
          + Novo Evento
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {events.length === 0 ? (
        <div className="no-events">
          <h3>Você ainda não criou nenhum evento</h3>
          <p>Crie seu primeiro evento para começar a vender ingressos e produtos.</p>
          <button
            className="button-primary"
            onClick={() => navigate('/admin/create-event')}
          >
            Criar meu primeiro evento
          </button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-image">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} />
                ) : (
                  <div className="event-placeholder">
                    <span>Sem imagem</span>
                  </div>
                )}
              </div>
              <div className="event-card-content">
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p className="event-date">{formatEventDate(event.date)}</p>
                  <p className="event-location">{event.location}</p>
                  <p className="event-products">{event.products.length} produtos</p>
                </div>
                <div className="event-card-footer">
                  <button 
                    className="button-secondary" 
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    Ver evento
                  </button>
                  <button 
                    className="button-primary" 
                    onClick={() => navigate(`/admin/events/${event.id}`)}
                  >
                    Gerenciar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}