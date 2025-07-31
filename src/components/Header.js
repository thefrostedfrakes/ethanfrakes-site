import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default function Header() {
    return (
        <header className="site-header">
            <img src={logo} className="site-logo" alt="logo" />
            <h1>My Website</h1>
            <nav>
                <Link to="/">Home</Link> | {' '}
                <Link to="/about">About</Link> | {' '}
                <Link to="/projects">Projects</Link> | {' '}
                <Link to="/publications">Publications</Link> | {' '}
                <Link to="/contact">Contact</Link> | {' '}
            </nav>
        </header>
    );
}