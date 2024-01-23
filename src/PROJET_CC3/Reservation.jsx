// Reservation.js

import React, { useState } from 'react';
import { Header } from './Header';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setListItems } from './ItemsSlice';
import Footer from './Footer';


export default function Reservation() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://mocki.io/v1/66489676-df51-41e4-bf64-e8360962df90`)
            .then((response) => response.json())
            .then((items) => {
                dispatch(setListItems(items));
            });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);
    const selectedItem = items.find((i) => i.id === (id));

    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(null);
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth() + 1);
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handlePrevMonth = () => {
        setDisplayedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
        if (displayedMonth === 1) {
            setDisplayedYear((prevYear) => prevYear - 1);
        }
    };

    const handleNextMonth = () => {
        setDisplayedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
        if (displayedMonth === 12) {
            setDisplayedYear((prevYear) => prevYear + 1);
        }
    };

    const daysInMonth = new Date(displayedYear, displayedMonth, 0).getDate();

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const isReservationButtonActive = selectedDate && selectedTime !== null;

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="back-button">
                    <Link to={`/Details/${id}`}>
                        <img src={"../../PROJET_CC3/en-arriere.png"} alt="Back" style={{ width: '30px' }} />
                    </Link>
                </div>
                <br />
                <div className='texxt'>
                    <h1 className='text text-danger'>{selectedItem.title}</h1>
                    <p>Consultez nos disponibilités et réservez la date et l'heure qui vous conviennent.</p>
                </div>
                <br />
                <div className='select'>
                    <p>Sélectionnez une date et une heure</p>
                    <hr />
                </div>
                <div className='row'>
                    <div className="calendar-container col-md-6">
                        <div className="month-header">
                            <button onClick={handlePrevMonth}>&lt;</button>
                            <span className="month-year">
                                {new Date(displayedYear, displayedMonth - 1).toLocaleString('default', { month: 'long' })} {displayedYear}
                            </span>
                            <button onClick={handleNextMonth}>&gt;</button>
                        </div>
                        <div className="calendar-days">
                            {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
                                const date = new Date(displayedYear, displayedMonth - 1, day);
                                const isDisabled = date < currentDate;
                                return (
                                    <div
                                        key={day}
                                        className={`calendar-day ${selectedDate === day ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                                        onClick={() => !isDisabled && handleDateClick(day)}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {selectedDate && (
                        <div className="time-section col-md-6">
                            <br />
                            <h4>Choose a Time:</h4>
                            <div className="time-buttons row ">
                                {Array.from({ length: 12 }, (_, index) => index + 9).map((hour) => (
                                    <div className='col-md-4'>
                                        <button
                                            key={hour}
                                            className={`time-button ${selectedTime === hour ? 'selected' : ''}`}
                                            onClick={() => handleTimeClick(hour)}
                                        >
                                            {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <br />
                {selectedDate && (
                    <p className='detail'>
                        Détails du service <br />
                        Salle de {selectedItem.title} <br />
                        {selectedDate}/{displayedMonth}/{displayedYear} à {selectedTime}:00 {selectedTime < 12 ? 'AM' : 'PM'} <br />
                        {selectedItem.Prix}dh/h
                    </p>
                )}
                <hr />
                <Link to={`/Details/Reservation/Informations/${selectedItem.id}/${selectedDate}/${displayedMonth}/${displayedYear}/${selectedTime}/`}>
                    <button
                        className="reserve-button"
                        onClick={() => console.log(`Selected Date: ${selectedDate}/${displayedMonth}/${displayedYear} at ${selectedTime}:00 ${selectedTime < 12 ? 'AM' : 'PM'}`)}
                        disabled={!isReservationButtonActive}
                    >
                        Suivant
                    </button>
                </Link>
                <br />
                <br />
            </div>
                <Footer />
        </>
    );
}
