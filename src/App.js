import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import RaceClassPage from './pages/RaceClassPage';
import AttributePage from './pages/AttributePage';
import SummaryPage from './pages/SummaryPage';

const App = () => {
  return (
    <CharacterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RaceClassPage />} />
          <Route path="/attributes" element={<AttributePage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
