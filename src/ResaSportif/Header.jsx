import React from 'react';
import "../index.css";
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand">
                        <img width={130} src={'./PROJET_CC3/resaSportif.png'} className="logo" alt="ResaSportif" />
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link to={'/'} className="nav-link">
                                <li className="nav-item active">Home</li>
                            </Link>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Service</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                        <div className="d-flex flex-wrap gap-2">
                            <Link to={'/signup'}>
                                <button className='btn btn-secondary BTN_SC'>S'inscrire</button>
                            </Link>
                            <Link to={'/login'}>
                                <button className='btn btn-danger BTN_S'>Se Connecter</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};