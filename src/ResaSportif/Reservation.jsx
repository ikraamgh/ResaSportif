import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListItems } from './ItemsSlice';
import Footer from './Footer';

export default function Reservation() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/data/items.json`)
            .then((response) => response.json())
            .then((items) => { dispatch(setListItems(items)); });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);
    const selectedItem = items.find((i) => i.id === id);

    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(null);
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth() + 1);
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateClick = (date) => { setSelectedDate(date); setSelectedTime(null); };
    const handlePrevMonth = () => {
        setDisplayedMonth((m) => (m === 1 ? 12 : m - 1));
        if (displayedMonth === 1) setDisplayedYear((y) => y - 1);
    };
    const handleNextMonth = () => {
        setDisplayedMonth((m) => (m === 12 ? 1 : m + 1));
        if (displayedMonth === 12) setDisplayedYear((y) => y + 1);
    };

    const daysInMonth = new Date(displayedYear, displayedMonth, 0).getDate();
    const isReservationButtonActive = selectedDate && selectedTime !== null;

    const monthLabel = new Date(displayedYear, displayedMonth - 1).toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

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
                <Link to={`/Details/${id}`} className="rs-back-link">← Retour aux détails</Link>

                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <span className="venue-badge" style={{ position:'static', display:'inline-block', marginBottom:12 }}>
                        {selectedItem.title}
                    </span>
                    <h1 style={{ color:'var(--green-deep)', fontSize:'1.8rem', marginBottom:8 }}>
                        Choisissez une date et une heure
                    </h1>
                    <p style={{ color:'var(--text-secondary)' }}>
                        Consultez nos disponibilités et réservez le créneau qui vous convient.
                    </p>
                </div>

                <div className="row g-5">
                    {/* Calendar */}
                    <div className="col-md-5">
                        <h6 style={{ fontWeight:700, color:'var(--green-deep)', marginBottom:16, fontSize:'0.88rem', textTransform:'uppercase', letterSpacing:'1px' }}>
                            Sélectionnez une date
                        </h6>
                        <div className="rs-calendar">
                            <div className="rs-calendar-header">
                                <button className="rs-calendar-nav-btn" onClick={handlePrevMonth}>‹</button>
                                <span style={{ textTransform:'capitalize' }}>{monthLabel}</span>
                                <button className="rs-calendar-nav-btn" onClick={handleNextMonth}>›</button>
                            </div>
                            <div className="rs-calendar-grid">
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                    const date = new Date(displayedYear, displayedMonth - 1, day);
                                    const isDisabled = date < currentDate;
                                    return (
                                        <div
                                            key={day}
                                            className={`rs-calendar-day${selectedDate === day ? ' selected' : ''}${isDisabled ? ' disabled' : ''}`}
                                            onClick={() => !isDisabled && handleDateClick(day)}
                                        >
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Time slots */}
                    <div className="col-md-7">
                        {selectedDate ? (
                            <>
                                <h6 style={{ fontWeight:700, color:'var(--green-deep)', marginBottom:16, fontSize:'0.88rem', textTransform:'uppercase', letterSpacing:'1px' }}>
                                    Créneaux disponibles — {selectedDate}/{displayedMonth}/{displayedYear}
                                </h6>
                                <div className="row g-2">
                                    {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                                        <div className="col-4" key={hour}>
                                            <button
                                                className={`time-slot-btn${selectedTime === hour ? ' selected' : ''}`}
                                                onClick={() => setSelectedTime(hour)}
                                            >
                                                {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', minHeight:200, color:'var(--text-secondary)', flexDirection:'column', gap:12 }}>
                                <span style={{ fontSize:'2rem' }}>📅</span>
                                <p>Sélectionnez une date pour voir les créneaux disponibles</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {selectedDate && selectedTime !== null && (
                    <div style={{ marginTop: 40 }}>
                        <div className="booking-summary">
                            <h5>Récapitulatif de la réservation</h5>
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
                            <div className="booking-summary-row booking-summary-total">
                                <span className="label">Prix</span>
                                <span className="value">{selectedItem.Prix} dh/h</span>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: 24 }}>
                    <Link to={`/Details/Reservation/Informations/${selectedItem.id}/${selectedDate}/${displayedMonth}/${displayedYear}/${selectedTime}/`}>
                        <button className="reserve-button" disabled={!isReservationButtonActive}>
                            Suivant — Renseignez vos informations
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
