import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';
import HudFrame from './components/HudFrame';
import { useKeyTap } from './keyTap';
import { useTheme } from './theme';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Publications from './pages/Publications';
import Contact from './pages/Contact';

import './themes.css';
import './App.css';

function App() {
  useKeyTap();
  const [theme, setTheme] = useTheme();

  return (
    <Router>
      <MatrixBackground theme={theme} />
      <Header theme={theme} onThemeChange={setTheme} />

      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/portfolio"    element={<Portfolio />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>

      <Footer />
      <HudFrame />
    </Router>
  );
}

export default App;
