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
        setErrorMessage('');
        setIsLoggedIn(true);
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="auth-page">
                <div className="auth-card">
                    <Link to="/" className="auth-back">← Retour à l'accueil</Link>

                    <div className="auth-brand">
                        <span className="auth-brand-text"><span>Resa</span>Sportif</span>
                    </div>

                    <h2 className="auth-title">Créer un compte</h2>
                    <p className="auth-subtitle">Rejoignez ResaSportif et réservez vos terrains facilement.</p>

                    <div className="rs-form-group">
                        <label className="rs-label">Nom d'utilisateur</label>
                        <input
                            className="rs-input"
                            type="text"
                            placeholder="Votre nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="rs-form-group">
                        <label className="rs-label">Adresse Email</label>
                        <input
                            className="rs-input"
                            type="email"
                            placeholder="vous@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="rs-form-group">
                        <label className="rs-label">Mot de passe</label>
                        <input
                            className="rs-input"
                            type="password"
                            placeholder="Minimum 8 caractères"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <div style={{ color:'#dc2626', fontSize:'0.88rem', marginBottom:16, padding:'10px 14px', background:'#fef2f2', borderRadius:'var(--radius-sm)', border:'1px solid #fecaca' }}>
                            {errorMessage}
                        </div>
                    )}

                    {isLoggedIn && (
                        <Link to="/">
                            <div style={{ color:'#16a34a', fontSize:'0.88rem', marginBottom:16, padding:'10px 14px', background:'#f0fdf4', borderRadius:'var(--radius-sm)', border:'1px solid #bbf7d0' }}>
                                ✓ Inscription réussie ! Redirection...
                            </div>
                        </Link>
                    )}

                    <button className="btn-rs-primary btn-rs-full" style={{ marginBottom:20 }} onClick={handleSignUp}>
                        S'inscrire →
                    </button>

                    <div style={{ textAlign:'center', borderTop:'1px solid var(--border)', paddingTop:20 }}>
                        <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', marginBottom:0 }}>
                            Déjà un compte ?{' '}
                            <Link to="/signup" style={{ color:'var(--green-deep)', fontWeight:700 }}>
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
