import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="App app-background">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* other routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
