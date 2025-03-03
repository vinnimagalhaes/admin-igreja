import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';

// Imports Admin
import CreateEvent from './pages/admin/CreateEvent';
import Events from './pages/admin/Events';
import EventsList from './pages/admin/EventsList';
import EventDetail from './pages/admin/EventDetail';
// Atualize estes imports para usar default exports
import RaffleManagement from './pages/admin/RaffleManagement';
import RaffleDetail from './pages/admin/RaffleDetail';
import Raffles from './pages/admin/Raffles';
import CreateRaffle from './pages/admin/CreateRaffle';

// Imports Public
import EventView from './pages/public/EventView';
import Checkout from './pages/public/Checkout';
import ProductCheckout from './pages/public/ProductCheckout';
import Login from './pages/Login';

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:eventId" element={<EventView />} />
          <Route path="/checkout/:eventId" element={<Checkout />} />
          <Route path="/product-checkout/:eventId" element={<ProductCheckout />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/admin/events-list" replace />} />
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
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;