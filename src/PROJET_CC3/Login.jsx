import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignUp = () => {
        if (!username || !email || !password) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }
        setIsLoggedIn(true);
    };

    return (
        <>
            <Header />
            <div className="signup-page" style={{ backgroundImage: `url('../PROJET_CC3/background.jpg')`, width: '100%' }}>
                <div className='card_S'>
                    <div className="back-button">
                        <Link to={`/`}>
                            <img src={process.env.PUBLIC_URL +"../../../../../../../../PROJET_CC3/en-arriere.png"} alt="Back" style={{ width: '30px' }} />
                        </Link>
                    </div>
                    <h1 className='text-center '>S'inscrire</h1>
                    <form className="card_S2">
                        <label><h6>Nom utilisateur: </h6></label>
                        <br />
                        <input className='form-control px-3' style={{ width: 370 }} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label><h6>Adresse Email: </h6></label>
                        <br />
                        <input className='form-control ' style={{ width: 370 }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label><h6>Mot de passe: </h6></label>
                        <br />
                        <input className='form-control ' style={{ width: 370 }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <br />
                    </form>
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-danger' style={{ width: 300 }} type="button" onClick={handleSignUp}>
                            <b>S'inscrire</b>
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="text-danger text-center mt-3">
                            {errorMessage}
                        </div>
                    )}
                    {isLoggedIn && (
                        <Link to="/">
                        <div className="text-success text-center mt-3">
                            Connexion réussie ! Redirection vers la page d'accueil...
                        </div>
                        </Link>
                    )}
                    <br />
                    <div className="login-separator-wrapper">
                        <div className="login-separator-component split-line">
                            <span className="separator-line"></span>
                            <h5>Ou connectez-vous avec</h5>
                            <span className="separator-line"></span>
                        </div>
                    </div>
                    <br />
                    <h6 className="card_S3">
                        Don't have an account? <span className="text-danger font-weight-bold"><Link to="/signup">Sign up</Link></span>
                    </h6>
                </div>
            </div>
        </>
    )
};
