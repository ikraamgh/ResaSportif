import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setListItems } from "./ItemsSlice";
import { Header } from "./Header";
import Footer from "./Footer";

export default function Informations() {
    const { id, selectedDate, displayedMonth, displayedYear, selectedTime } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => { event.preventDefault(); };

    useEffect(() => {
        fetch(`/data/items.json`)
            .then((response) => response.json())
            .then((items) => { dispatch(setListItems(items)); });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);
    const selectedItem = items.find((i) => i.id === id);

    if (!selectedItem) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Header />
            <div className="container" style={{ paddingTop: 36, paddingBottom: 72 }}>
                <Link to={`/Details/Reservation/${id}`} className="rs-back-link">← Retour à la réservation</Link>

                <div style={{ marginBottom: 40 }}>
                    <h1 style={{ color:'var(--green-deep)', fontSize:'1.8rem', marginBottom:8 }}>Vos informations</h1>
                    <p style={{ color:'var(--text-secondary)' }}>Renseignez vos coordonnées pour finaliser la réservation.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row g-5">
                        {/* Form */}
                        <div className="col-md-7">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="rs-form-group">
                                        <label className="rs-label">Nom *</label>
                                        <input
                                            className="rs-input"
                                            type="text"
                                            placeholder="Votre nom complet"
                                            maxLength="100"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="rs-form-group">
                                        <label className="rs-label">Adresse e-mail *</label>
                                        <input
                                            className="rs-input"
                                            type="email"
                                            placeholder="vous@exemple.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="rs-form-group">
                                        <label className="rs-label">Numéro de téléphone</label>
                                        <input
                                            className="rs-input"
                                            type="tel"
                                            placeholder="+212 6XX XXX XXX"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="rs-form-group">
                                        <label className="rs-label">Message (optionnel)</label>
                                        <textarea
                                            className="rs-textarea"
                                            placeholder="Informations supplémentaires..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows="4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking summary */}
                        <div className="col-md-5">
                            <div className="booking-summary">
                                <h5>Récapitulatif</h5>
                                <div className="booking-summary-row">
                                    <span className="label">Terrain</span>
                                    <span className="value">{selectedItem.title}</span>
                                </div>
                                <div className="booking-summary-row">
                                    <span className="label">Date</span>
                                    <span className="value">{selectedDate}/{displayedMonth}/{displayedYear}</span>
                                </div>
                                <div className="booking-summary-row">
                                    <span className="label">Heure</span>
                                    <span className="value">{selectedTime}:00 {selectedTime < 12 ? 'AM' : 'PM'}</span>
                                </div>
                                <div className="booking-summary-row booking-summary-total" style={{ marginTop: 8 }}>
                                    <span className="label">Total</span>
                                    <span className="value">{selectedItem.Prix} dh/h</span>
                                </div>
                                <div style={{ marginTop: 24 }}>
                                    <Link to={`/Payement/${selectedItem.id}`}>
                                        <button type="submit" className="btn-rs-primary btn-rs-full">
                                            Continuer vers le paiement →
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
