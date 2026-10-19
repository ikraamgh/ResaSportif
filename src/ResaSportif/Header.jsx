import React from 'react';
import "../index.css";
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg rs-navbar">
            <div className="container">
                <Link to={"/"} className="navbar-brand">
                    <span className="brand-text"><span>Resa</span>Sportif</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMain"
                    aria-controls="navbarMain"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#salles">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <Link to={'/signup'}>
                            <button className="btn-rs-outline">S'inscrire</button>
                        </Link>
                        <Link to={'/login'}>
                            <button className="btn-rs-primary">Se Connecter</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};