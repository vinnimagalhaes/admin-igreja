import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Events from './pages/Events.tsx';  // Adicione esta linha
import EventsUser from './pages/EventsUser.tsx';
import EventsList from './pages/EventsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events-user" element={<EventsUser />} />
        <Route path="/events-list" element={<EventsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;