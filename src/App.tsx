import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';

// Imports Admin
import CreateEvent from './pages/admin/CreateEvent';
import Events from './pages/admin/Events';
import EventsList from './pages/admin/EventsList';
import EventDetail from './pages/admin/EventDetail';
import Dashboard from './pages/Dashboard';
import RaffleManagement from './pages/RaffleManagement';
import RaffleDetail from './pages/RaffleDetail';
import Raffles from './pages/Raffles';
import CreateRaffle from './pages/CreateRaffle';

// Imports Public
import EventView from './pages/public/EventView';
import Checkout from './pages/public/Checkout';
import ProductCheckout from './pages/public/ProductCheckout';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Públicas */}
          <Route path="/event/:eventId" element={<EventView />} />
          <Route path="/checkout/:eventId" element={<Checkout />} />
          <Route path="/product-checkout/:eventId" element={<ProductCheckout />} />

          {/* Rotas Admin (protegidas) */}
          <Route 
            path="/admin/*" 
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="events-list" element={<EventsList />} />
                  <Route path="create-event" element={<CreateEvent />} />
                  <Route path="events" element={<Events />} />
                  <Route path="events/:id" element={<EventDetail />} />
                  <Route path="raffles" element={<Raffles />} />
                  <Route path="create-raffle" element={<CreateRaffle />} />
                  <Route path="raffle-management" element={<RaffleManagement />} />
                  <Route path="raffles/:id" element={<RaffleDetail />} />
                </Routes>
              </Layout>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;