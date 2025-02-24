import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventsUser from './pages/EventsUser';
import EventsList from './pages/EventsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rotas protegidas com Layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events-user" element={<Layout><EventsUser /></Layout>} />
        <Route path="/events-list" element={<Layout><EventsList /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;