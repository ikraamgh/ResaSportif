import React, { useEffect, useState } from "react";
import { setListItems } from "./ItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";

export default function Payement() {
    const { id, selectedDate, displayedMonth, displayedYear, selectedTime } = useParams();
    const dispatch = useDispatch();
    const [nameCard, setNameCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [MMYY, setMMYY] = useState("");
    const [cvvCode, setCvvCode] = useState("");
    const [payMethod, setPayMethod] = useState("card"); // 'card' | 'paypal'

    useEffect(() => {
        fetch(`/data/items.json`)
            .then((response) => response.json())
            .then((items) => { dispatch(setListItems(items)); });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);
    const selectedItem = items.find((i) => i.id === id);

    const handleSubmit = (e) => { e.preventDefault(); };

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
                <Link
                    to={`/Details/Reservation/Informations/${selectedItem.id}/${selectedDate}/${displayedMonth}/${displayedYear}/${selectedTime}`}
                    className="rs-back-link"
                >
                    ← Retour aux informations
                </Link>

                <div style={{ marginBottom: 40 }}>
                    <h1 style={{ color:'var(--green-deep)', fontSize:'1.8rem', marginBottom:8 }}>Paiement</h1>
                    <p style={{ color:'var(--text-secondary)' }}>Sécurisez votre réservation en complétant le paiement.</p>
                </div>

                <div className="row g-5">
                    {/* Payment form */}
                    <div className="col-md-7">
                        {/* Method toggle */}
                        <div style={{ display:'flex', gap:12, marginBottom:28 }}>
                            <button
                                type="button"
                                onClick={() => setPayMethod('card')}
                                style={{
                                    flex:1, padding:'12px', borderRadius:'var(--radius-sm)',
                                    border: payMethod === 'card' ? '2px solid var(--lime)' : '2px solid var(--border)',
                                    background: payMethod === 'card' ? 'var(--lime-light)' : 'var(--white)',
                                    fontWeight:600, color:'var(--green-deep)', cursor:'pointer',
                                    transition:'var(--transition)'
                                }}
                            >
                                💳 Carte bancaire
                            </button>
                            <button
                                type="button"
                                onClick={() => setPayMethod('paypal')}
                                style={{
                                    flex:1, padding:'12px', borderRadius:'var(--radius-sm)',
                                    border: payMethod === 'paypal' ? '2px solid var(--lime)' : '2px solid var(--border)',
                                    background: payMethod === 'paypal' ? 'var(--lime-light)' : 'var(--white)',
                                    fontWeight:600, color:'var(--green-deep)', cursor:'pointer',
                                    transition:'var(--transition)'
                                }}
                            >
                                🅿️ PayPal
                            </button>
                        </div>

                        {payMethod === 'card' ? (
                            <form onSubmit={handleSubmit}>
                                <div className="rs-form-group">
                                    <label className="rs-label">Numéro de carte</label>
                                    <input
                                        className="rs-input"
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </div>
                                <div className="rs-form-group">
                                    <label className="rs-label">Nom sur la carte</label>
                                    <input
                                        className="rs-input"
                                        type="text"
                                        placeholder="Prénom NOM"
                                        value={nameCard}
                                        onChange={(e) => setNameCard(e.target.value)}
                                    />
                                </div>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="rs-form-group">
                                            <label className="rs-label">Date d'expiration</label>
                                            <input
                                                className="rs-input"
                                                type="text"
                                                placeholder="MM / AA"
                                                maxLength="7"
                                                value={MMYY}
                                                onChange={(e) => setMMYY(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="rs-form-group">
                                            <label className="rs-label">CVV</label>
                                            <input
                                                className="rs-input"
                                                type="text"
                                                placeholder="123"
                                                maxLength="4"
                                                value={cvvCode}
                                                onChange={(e) => setCvvCode(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop:8, padding:'12px 16px', background:'var(--lime-light)', borderRadius:'var(--radius-sm)', fontSize:'0.85rem', color:'var(--green-deep)', display:'flex', gap:8, alignItems:'center' }}>
                                    🔒 Paiement 100% sécurisé — vos données sont chiffrées
                                </div>
                            </form>
                        ) : (
                            <div style={{ textAlign:'center', padding:'40px 24px', background:'var(--bg)', borderRadius:'var(--radius-md)', border:'1.5px solid var(--border)' }}>
                                <div style={{ fontSize:'3rem', marginBottom:16 }}>🅿️</div>
                                <p style={{ color:'var(--text-secondary)', marginBottom:0 }}>
                                    Vous serez redirigé vers PayPal pour compléter le paiement.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
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
                            <div className="booking-summary-row booking-summary-total" style={{ marginTop:8 }}>
                                <span className="label">Total à payer</span>
                                <span className="value">{selectedItem.Prix} dh</span>
                            </div>
                            <div style={{ marginTop:24 }}>
                                <button
                                    type="button"
                                    className="btn-rs-primary btn-rs-full"
                                    onClick={handleSubmit}
                                >
                                    Payer {selectedItem.Prix} dh →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
