import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventsUser from './pages/EventsUser';
import EventsList from './pages/EventsList';
import EventDetails from './pages/EventDetails';
import Raffles from './pages/Raffles';
import RaffleManagement from './pages/RaffleManagement';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import CreateRaffle from './pages/CreateRaffle';
import RaffleDetail from './pages/RaffleDetail';
import RaffleCheckout from './pages/RaffleCheckout';
import './styles/shared.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Rota inicial vai para a página de login que tem as duas opções */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas públicas */}
          <Route path="/events-user" element={<EventsUser />} />
          <Route path="/events-user/:id" element={<EventDetails />} />
          
          {/* Rotas administrativas */}
          <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/events" element={<Layout><Events /></Layout>} />
          <Route path="/admin/events-list" element={<Layout><EventsList /></Layout>} />
          <Route path="/admin/create-event" element={<Layout><CreateEvent /></Layout>} />
          <Route path="/admin/events/:id" element={<Layout><EventDetail /></Layout>} />
          <Route path="/admin/raffles" element={<Layout><Raffles /></Layout>} />
          <Route path="/admin/create-raffle" element={<Layout><CreateRaffle /></Layout>} />
          <Route path="/admin/raffles/:id" element={<Layout><RaffleDetail /></Layout>} />
          <Route path="/admin/raffles/:id/buy" element={<RaffleCheckout />} />

          {/* Rotas de navegação padrão */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;