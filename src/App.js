import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';


import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Contact from './pages/Contact';

import './App.css';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/projects"    element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
