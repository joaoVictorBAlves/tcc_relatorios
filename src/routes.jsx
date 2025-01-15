import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Relatorios from './pages/Relatorios';
import Devolutivas from './pages/Devolutivas';
import Login from './pages/Login';
import Launcher from './pages/Launcher';

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/devolutivas" element={<Devolutivas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Launcher />} />
      </Routes>
    </Router>
  );
};

export default RoutesPage;