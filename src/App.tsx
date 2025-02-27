import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EventsList from './pages/admin/EventsList';
import CreateEvent from './pages/admin/CreateEvent';
import EventDetail from './pages/admin/EventDetail';
import CreateRaffle from './pages/CreateRaffle';
import RaffleDetail from './pages/RaffleDetail';
import Raffles from './pages/Raffles';
import RaffleCheckout from './pages/RaffleCheckout';
import Login from './pages/Login';
import { Layout } from './components/Layout';
import './styles/shared.css';
import EventView from './pages/public/EventView';
import ProductCheckout from './pages/public/ProductCheckout';
import PublicEventView from './pages/public/EventView';
import { ThemeProvider } from './contexts/ThemeContext';

// Removidas as importações não utilizadas:
// - ThemeProvider
// - Events
// - EventsUser
// - EventDetails
// - RaffleManagement

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/raffles/:id/buy" element={<RaffleCheckout />} />
          
          <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/events-list" element={<Layout><EventsList /></Layout>} />
          <Route path="/admin/create-event" element={<Layout><CreateEvent /></Layout>} />
          <Route path="/admin/events/:id" element={<Layout><EventDetail /></Layout>} />
          <Route path="/admin/raffles" element={<Layout><Raffles /></Layout>} />
          <Route path="/admin/create-raffle" element={<Layout><CreateRaffle /></Layout>} />
          <Route path="/admin/raffles/:id" element={<Layout><RaffleDetail /></Layout>} />
          
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/events/:id" element={<EventView />} />
          <Route path="/events/:id/checkout" element={<ProductCheckout />} />
          <Route path="/events/:eventId" element={<PublicEventView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;