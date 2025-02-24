import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<EventsUser />} />
        <Route path="/event/:id" element={<EventDetails />} />
        
        {/* Rotas administrativas */}
        <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/events" element={<Layout><Events /></Layout>} />
        <Route path="/admin/events-list" element={<Layout><EventsList /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;