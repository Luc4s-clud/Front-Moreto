import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import RaceClassPage from './pages/RaceClassPage';
import AttributePage from './pages/AttributePage';
import SummaryPage from './pages/SummaryPage';
import Demo from './pages/LoginPage';
import MagicClickEffect from './components/MagicClickEffect'; 
import './styles/MagicClickEffect.css'; // Importe o CSS
import RegisterPage from './pages/RegisterPage';
import CharacterPage from './pages/CharacterPage.js'

const App = () => {
  return (
    <CharacterProvider>
      <Router>
        <MagicClickEffect /> 
        <Routes>
          <Route path="/" element={<CharacterPage />} />
          <Route path="/raceclass" element={<RaceClassPage />} />
          <Route path="/attributes" element={<AttributePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Demo />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
