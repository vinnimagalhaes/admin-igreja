import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventsUser from './pages/EventsUser';
import EventsList from './pages/EventsList';
import EventDetails from './pages/EventDetails';
import Raffles from './pages/Raffles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial vai para a página de login que tem as duas opções */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas públicas */}
        <Route path="/events-user" element={<EventsUser />} />
        <Route path="/event/:id" element={<EventDetails />} />
        
        {/* Rotas administrativas */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/events" element={<Layout><Events /></Layout>} />
        <Route path="/admin/events-list" element={<Layout><EventsList /></Layout>} />
        <Route path="/admin/raffles" element={<Layout><Raffles /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;