// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <nav className={`site-nav ${open ? 'is-open' : ''}`}>
        <div className="site-nav__inner">
          {/* centered links (desktop), hidden on mobile until toggled */}
          <div id="primary-navigation" className="site-nav__links">
            <Link to="/">Home</Link>{' '}
            <Link to="/about">About</Link>{' '}
            <Link to="/portfolio">Portfolio</Link>{' '}
            <Link to="/publications">Publications</Link>{' '}
            <Link to="/contact">Contact</Link>
          </div>

          {/* hamburger at right (mobile only) */}
          <button
            className="site-nav__toggle"
            aria-controls="primary-navigation"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen(v => !v)}
          >
            <span className="hamburger" />
          </button>
        </div>
      </nav>

      <h1>Ethan Frakes</h1>
      <p><small>Welcome to my website!</small></p>
    </header>
  );
}
