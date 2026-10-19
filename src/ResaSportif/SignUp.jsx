import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = () => {
        if (!username || !password) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }
        setErrorMessage('');
        console.log('SIGN UP:', { username, password });
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

                    <h2 className="auth-title">Se connecter</h2>
                    <p className="auth-subtitle">Accédez à votre espace et gérez vos réservations.</p>

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
                        <label className="rs-label">Mot de passe</label>
                        <input
                            className="rs-input"
                            type="password"
                            placeholder="Votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <div style={{ color:'#dc2626', fontSize:'0.88rem', marginBottom:16, padding:'10px 14px', background:'#fef2f2', borderRadius:'var(--radius-sm)', border:'1px solid #fecaca' }}>
                            {errorMessage}
                        </div>
                    )}

                    <button className="btn-rs-primary btn-rs-full" style={{ marginBottom:20 }} onClick={handleSignUp}>
                        Se connecter →
                    </button>

                    <div style={{ textAlign:'center', borderTop:'1px solid var(--border)', paddingTop:20 }}>
                        <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', marginBottom:0 }}>
                            Pas encore de compte ?{' '}
                            <Link to="/login" style={{ color:'var(--green-deep)', fontWeight:700 }}>
                                S'inscrire
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}