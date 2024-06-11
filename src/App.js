import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import RaceClassPage from './pages/RaceClassPage';
import AttributePage from './pages/AttributePage';
import SummaryPage from './pages/SummaryPage';
import Demo from './pages/LoginPage';
import MagicClickEffect from './components/MagicClickEffect'; // Importe o componente
import './styles/MagicClickEffect.css'; // Importe o CSS

const App = () => {
  return (
    <CharacterProvider>
      <Router>
        <MagicClickEffect /> {/* Adicione o componente aqui */}
        <Routes>
          <Route path="/login" element={<Demo />} />
          <Route path="/raceclass" element={<RaceClassPage />} />
          <Route path="/attributes" element={<AttributePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
