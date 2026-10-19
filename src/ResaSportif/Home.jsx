import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListItems } from "./ItemsSlice";
import Item from './Item';
import "../index.css";
import { Header } from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';

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
            setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/data/items.json`)
            .then((r) => r.json())
            .then((items) => dispatch(setListItems(items)));
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);

    // ── Search / Filter state ──
    const [searchSport, setSearchSport] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const filteredItems = items.filter((item) => {
        const matchSport = !searchSport || item.title === searchSport;
        return matchSport; // date filter is UX only (no backend) — still scrolls to section
    });

    const handleSearch = (e) => {
        e.preventDefault();
        document.getElementById('terrains')?.scrollIntoView({ behavior: 'smooth' });
    };

    // ── Avis state — starts empty (no fake data) ──
    const [avisState, setAvisState] = useState([]);
    const [userAvis, setUserAvis] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNom, setUserNom] = useState('');
    const [avisSuccess, setAvisSuccess] = useState(false);

    const addAvis = () => {
        if (!userNom.trim() || !userAvis.trim()) return;
        setAvisState([...avisState, { id: Date.now(), nom: userNom, avis: userAvis }]);
        setUserAvis(''); setUserEmail(''); setUserNom('');
        setAvisSuccess(true);
        setTimeout(() => setAvisSuccess(false), 3000);
    };

    // ── Contact ──
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); };

    // Today's date for date input min
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="page-wrapper">
            <Header />

            {/* ── Hero ── */}
            <section className="rs-hero">
                <img src={images[currentImageIndex]} alt="Terrain de sport" className="rs-hero-image" />
                <div className="rs-hero-overlay" />
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="rs-hero-content">
                        <div className="rs-hero-badge">Plateforme de réservation sportive</div>
                        <h1>
                            Trouvez votre terrain.<br />
                            <span className="lime-word">Réservez</span> en quelques clics.
                        </h1>
                        <p>Football, basketball, tennis, natation et bien plus — réservez votre créneau directement en ligne.</p>
                    </div>

                    {/* ── Search Bar ── */}
                    <form className="hero-search-bar" onSubmit={handleSearch}>
                        <div className="hero-search-field">
                            <label className="hero-search-label">Sport</label>
                            <select
                                className="hero-search-input"
                                value={searchSport}
                                onChange={(e) => setSearchSport(e.target.value)}
                            >
                                <option value="">Tous les sports</option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.title}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="hero-search-divider" />
                        <div className="hero-search-field">
                            <label className="hero-search-label">Date</label>
                            <input
                                className="hero-search-input"
                                type="date"
                                min={today}
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="hero-search-btn">
                            Rechercher
                        </button>
                    </form>
                </div>
            </section>

            {/* ── Advantages ── */}
            <section className="advantages-section">
                <div className="container">
                    <div className="row g-4">
                        {[
                            { img: 'icone-avantage1.png', title: 'Réservation en 2 minutes', desc: 'Choisissez votre sport, votre date et confirmez — sans paperasse.' },
                            { img: 'icone-avantage2.png', title: 'Large choix de terrains', desc: '7 disciplines sportives disponibles dans notre réseau.' },
                            { img: 'icone-avantage3.png', title: 'Paiement sécurisé', desc: 'Carte bancaire ou PayPal — vos données sont chiffrées.' },
                        ].map((adv) => (
                            <div className="col-md-4" key={adv.title}>
                                <div className="advantage-card">
                                    <div className="advantage-icon">
                                        <img src={`PROJET_CC3/${adv.img}`} alt={adv.title} />
                                    </div>
                                    <h6>{adv.title}</h6>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>{adv.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Comment ça marche ── */}
            <section style={{ background: 'var(--green-deep)', padding: '64px 0' }}>
                <div className="container">
                    <h2 className="section-title text-center" style={{ color: '#fff', marginBottom: 48, textAlign: 'center' }}>
                        Comment réserver ?
                    </h2>
                    <div className="row g-4 text-center">
                        {[
                            { n: '1', t: 'Choisissez un terrain', d: 'Parcourez les terrains disponibles et sélectionnez celui qui vous convient.' },
                            { n: '2', t: 'Sélectionnez une date', d: 'Choisissez le jour et le créneau horaire qui vous correspond.' },
                            { n: '3', t: 'Confirmez et payez', d: 'Renseignez vos coordonnées et finalisez en quelques secondes.' },
                        ].map((step) => (
                            <div className="col-md-4" key={step.n}>
                                <div style={{ color: 'var(--lime)', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, marginBottom: 14 }}>{step.n}</div>
                                <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: 10 }}>{step.t}</h5>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', margin: 0 }}>{step.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Terrains ── */}
            <section className="salles-section" id="terrains">
                <div className="container">
                    <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: 4 }}>
                        {searchSport ? `Sport filtré : ${searchSport}` : 'TOUS NOS TERRAINS'}
                    </p>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>
                        Terrains disponibles
                    </h2>

                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏳</div>
                            <p>Chargement des terrains…</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</div>
                            <p>Aucun terrain trouvé pour <strong>{searchSport}</strong>.</p>
                            <button className="btn-rs-primary" style={{ marginTop: 16 }} onClick={() => setSearchSport('')}>
                                Voir tous les terrains
                            </button>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredItems.map((item) => (
                                <div className="col-md-4 col-sm-6" key={item.id}>
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
                    <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: 4 }}>RETOURS DE NOS UTILISATEURS</p>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>Avis clients</h2>

                    {avisState.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 24px', background: 'var(--bg)', border: '1.5px dashed var(--border)', borderRadius: 'var(--radius-md)', maxWidth: 520, margin: '0 auto 40px' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 12 }}>💬</div>
                            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                                Les avis de nos utilisateurs apparaîtront ici.<br />
                                Soyez le premier à partager votre expérience !
                            </p>
                        </div>
                    ) : (
                        <div className="avis-container" style={{ marginBottom: 40 }}>
                            {avisState.map((avi) => (
                                <div className="avis-card" key={avi.id}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--green-deep)', fontSize: '0.9rem', flexShrink: 0 }}>
                                            {avi.nom.charAt(0).toUpperCase()}
                                        </div>
                                        <strong style={{ color: 'var(--green-deep)' }}>{avi.nom}</strong>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>{avi.avis}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <hr style={{ borderColor: 'var(--border)', margin: '32px 0' }} />

                    <div className="avis-form">
                        <h5 style={{ fontWeight: 700, color: 'var(--green-deep)', marginBottom: 4 }}>Partagez votre expérience</h5>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 20 }}>Votre avis aide les autres utilisateurs.</p>

                        {avisSuccess && (
                            <div style={{ padding: '10px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-sm)', color: '#16a34a', fontSize: '0.88rem', marginBottom: 16 }}>
                                ✓ Votre avis a été publié !
                            </div>
                        )}

                        <div className="rs-form-group">
                            <label className="rs-label">Votre nom *</label>
                            <input className="rs-input" type="text" placeholder="Prénom ou pseudo" value={userNom} onChange={(e) => setUserNom(e.target.value)} />
                        </div>
                        <div className="rs-form-group">
                            <label className="rs-label">Email (optionnel)</label>
                            <input className="rs-input" type="email" placeholder="vous@exemple.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        </div>
                        <div className="rs-form-group">
                            <label className="rs-label">Votre avis *</label>
                            <textarea className="rs-textarea" placeholder="Décrivez votre expérience avec ResaSportif…" value={userAvis} onChange={(e) => setUserAvis(e.target.value)} />
                        </div>
                        <button className="btn-rs-primary btn-rs-full" onClick={addAvis}>Publier mon avis</button>
                    </div>
                </div>
            </section>

            {/* ── Contact ── */}
            <section className="contact-section" id="contact">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <p className="section-subtitle" style={{ marginBottom: 4 }}>NOUS CONTACTER</p>
                            <h2 className="section-title" style={{ marginBottom: 16 }}>Une question ?</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                Pour toute demande d'information, suggestion ou problème technique,
                                remplissez le formulaire et nous vous répondrons dans les meilleurs délais.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="rs-form-group">
                                    <label className="rs-label">Téléphone (optionnel)</label>
                                    <input className="rs-input" type="tel" placeholder="+212 6XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="rs-form-group">
                                    <label className="rs-label">Message *</label>
                                    <textarea className="rs-textarea" placeholder="Votre message…" value={message} onChange={(e) => setMessage(e.target.value)} />
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
