import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListItems } from "./ItemsSlice";
import Item from './Item';
import "../index.css";
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse container" id="navbarTogglerDemo01">
                    <Link to={"/"} >
                        <img width={150} src={'./PROJET_CC3/resaSportif.png'} />
                    </Link>
                    <div></div>
                    <div></div>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <Link to={'/'}>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                        </Link>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                    <div>
                        <Link to={'/signup'}>
                            <button className='btn btn-secondary BTN_SC'>S'inscrire</button>
                        </Link>
                        <Link to={'/login'}>
                            <button className='btn btn-danger BTN_S'>Se Connecter</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};