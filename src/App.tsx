import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventsUser from './pages/EventsUser';
import EventsList from './pages/EventsList';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial agora vai para a página de eventos */}
        <Route path="/" element={<Navigate to="/events-user" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas públicas */}
        <Route path="/events-user" element={<EventsUser />} />
        <Route path="/event/:id" element={<EventDetails />} />
        
        {/* Rotas administrativas */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/events" element={<Layout><Events /></Layout>} />
        <Route path="/admin/events-list" element={<Layout><EventsList /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;