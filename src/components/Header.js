import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="site-header">
            {/* <img src={logo} className="site-logo" alt="logo" /> */}
            <h1>Ethan Frakes</h1>
            <p><small>Welcome to my website!</small></p>
            <nav>
                <Link to="/">Home</Link> | {' '}
                <Link to="/about">About</Link> | {' '}
                <Link to="/portfolio">Portfolio</Link> | {' '}
                <Link to="/publications">Publications</Link> | {' '}
                <Link to="/contact">Contact</Link> | {' '}
            </nav>
        </header>
    );
}