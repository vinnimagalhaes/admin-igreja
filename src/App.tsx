import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';

// Imports Admin
import CreateEvent from './pages/admin/CreateEvent';
import Events from './pages/admin/Events';
import EventsList from './pages/admin/EventsList';
import EventDetail from './pages/admin/EventDetail';
import RaffleManagement from './pages/RaffleManagement';
import RaffleDetail from './pages/RaffleDetail';
import Raffles from './pages/Raffles';
import CreateRaffle from './pages/CreateRaffle';

// Imports Public
import EventView from './pages/public/EventView';
import Checkout from './pages/public/Checkout';
import ProductCheckout from './pages/public/ProductCheckout';
import Login from './pages/Login';

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirecionar a rota raiz para o login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

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
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    {/* Redirecionar /admin para /admin/events-list */}
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

          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;