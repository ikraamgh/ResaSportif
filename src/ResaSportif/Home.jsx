import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListItems } from "./ItemsSlice";
import Item from './Item';
import "../index.css";
import { Header } from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const avis = [
    { id: 1, nom: 'Ahmed', avis: 'Très satisfait de la qualité de votre service. Réservation rapide et sans problème.' },
    { id: 2, nom: 'Said', avis: 'Les prix sont corrects et le terrain est superbe. Je recommande vivement !' },
    { id: 3, nom: 'Achraf', avis: 'La location s\'est faite rapidement et en toute sécurité. Excellent service.' },
];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        './PROJET_CC3/Home1.jpg',
        './PROJET_CC3/Home2.jpeg',
        './PROJET_CC3/Home3.jpg',
        './PROJET_CC3/Home4.jpg',
        './PROJET_CC3/Home5.png',
        './PROJET_CC3/Home6.png',
        './PROJET_CC3/Home7.jpg',
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/data/items.json`)
            .then((response) => response.json())
            .then((items) => { dispatch(setListItems(items)); });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);

    const [userAvis, setUserAvis] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNom, setUserNom] = useState('');
    const [avisState, setAvisState] = useState(avis);
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => { e.preventDefault(); };

    const addAvis = () => {
        if (!userNom.trim() || !userAvis.trim()) return;
        const newAvis = { id: avisState.length + 1, nom: userNom, avis: userAvis };
        setAvisState([...avisState, newAvis]);
        setUserAvis('');
        setUserEmail('');
        setUserNom('');
    };

    return (
        <div className="page-wrapper">
            <Header />

            {/* ── Hero ── */}
            <section className="rs-hero">
                <img
                    src={images[currentImageIndex]}
                    alt="Sports facility"
                    className="rs-hero-image"
                />
                <div className="rs-hero-overlay" />
                <div className="container">
                    <div className="rs-hero-content">
                        <div className="rs-hero-badge">Plateforme #1 de réservation sportive</div>
                        <h1>
                            Trouvez votre terrain.<br />
                            <span className="lime-word">Réservez</span> en quelques clics.
                        </h1>
                        <p>
                            Accédez aux meilleurs terrains de sport près de chez vous.
                            Football, basketball, tennis et bien plus encore.
                        </p>
                        <div className="rs-hero-actions">
                            <Link to="/login">
                                <button className="btn-rs-primary">Réserver maintenant →</button>
                            </Link>
                            <a href="#salles">
                                <button className="btn-rs-outline">Voir les terrains</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Advantages ── */}
            <section className="advantages-section">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="advantage-card">
                                <div className="advantage-icon">
                                    <img src="PROJET_CC3/icone-avantage1.png" alt="Facilité" />
                                </div>
                                <h6>Facilité de Réservation</h6>
                                <p style={{color:'var(--text-secondary)', fontSize:'0.9rem', marginTop:8}}>
                                    Réservez votre terrain en moins de 2 minutes, 24h/24.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="advantage-card">
                                <div className="advantage-icon">
                                    <img src="PROJET_CC3/icone-avantage2.png" alt="Diversité" />
                                </div>
                                <h6>Diversité d'Installations</h6>
                                <p style={{color:'var(--text-secondary)', fontSize:'0.9rem', marginTop:8}}>
                                    Plus de 7 types de sports disponibles dans notre réseau.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="advantage-card">
                                <div className="advantage-icon">
                                    <img src="PROJET_CC3/icone-avantage3.png" alt="Compte" />
                                </div>
                                <h6>Gestion de Compte</h6>
                                <p style={{color:'var(--text-secondary)', fontSize:'0.9rem', marginTop:8}}>
                                    Gérez vos réservations et votre historique facilement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Salles ── */}
            <section className="salles-section" id="salles">
                <div className="container">
                    <p className="section-subtitle text-center" style={{textAlign:'center', marginBottom:4}}>NOS INSTALLATIONS</p>
                    <h2 className="section-title text-center" style={{textAlign:'center', marginBottom:48}}>
                        Salles Disponibles
                    </h2>
                    {items.length === 0 ? (
                        <div className="text-center" style={{padding:'60px 0', color:'var(--text-secondary)'}}>
                            <div style={{fontSize:'2rem', marginBottom:12}}>⏳</div>
                            <p>Chargement des terrains...</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {items.map((item, index) => (
                                <div className="col-md-4 col-sm-6" key={index}>
                                    <Item
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        prix={item.Prix}
                                        image={item.image}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Avis ── */}
            <section className="avis-section" id="avis">
                <div className="container">
                    <p className="section-subtitle text-center" style={{textAlign:'center', marginBottom:4}}>CE QUE DISENT NOS CLIENTS</p>
                    <h2 className="section-title text-center" style={{textAlign:'center', marginBottom:40}}>Avis Clients</h2>

                    <div className="avis-container">
                        {avisState.map((avi) => (
                            <div className="avis-card" key={avi.id}>
                                <h2>{avi.nom}</h2>
                                <h6>{avi.avis}</h6>
                            </div>
                        ))}
                    </div>

                    <hr style={{borderColor:'var(--border)', margin:'32px 0'}} />

                    <div className="avis-form">
                        <h5 style={{fontWeight:700, color:'var(--green-deep)', marginBottom:4}}>Partagez votre expérience</h5>
                        <p style={{color:'var(--text-secondary)', fontSize:'0.9rem', marginBottom:20}}>
                            Votre avis nous aide à nous améliorer.
                        </p>
                        <div className="rs-form-group">
                            <label className="rs-label">Votre nom</label>
                            <input className="rs-input" type="text" placeholder="Ex: Ahmed" value={userNom} onChange={(e) => setUserNom(e.target.value)} />
                        </div>
                        <div className="rs-form-group">
                            <label className="rs-label">Votre email</label>
                            <input className="rs-input" type="email" placeholder="vous@exemple.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        </div>
                        <div className="rs-form-group">
                            <label className="rs-label">Votre avis</label>
                            <textarea className="rs-textarea" placeholder="Partagez votre expérience..." value={userAvis} onChange={(e) => setUserAvis(e.target.value)} />
                        </div>
                        <button className="btn-rs-primary btn-rs-full" onClick={addAvis}>
                            Publier mon avis
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Contact ── */}
            <section className="contact-section" id="contact">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <p className="section-subtitle" style={{marginBottom:4}}>NOUS CONTACTER</p>
                            <h2 className="section-title" style={{marginBottom:16}}>Avez-vous quelque chose à dire?</h2>
                            <p style={{color:'var(--text-secondary)', lineHeight:1.7}}>
                                Faites-nous part de vos questions, suggestions et préoccupations
                                en remplissant le formulaire de contact ci-dessous.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="rs-form-group">
                                    <label className="rs-label">Téléphone</label>
                                    <input className="rs-input" type="tel" placeholder="+212 6XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="rs-form-group">
                                    <label className="rs-label">Message</label>
                                    <textarea className="rs-textarea" placeholder="Votre message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                                </div>
                                <button type="submit" className="btn-rs-dark">Envoyer le message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
