// Calendar.js

import React, { useState } from 'react';

const Calendar = () => {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(null);
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth() + 1);
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Réinitialiser l'heure sélectionnée lorsqu'une nouvelle date est choisie
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

    const isReservationButtonActive = selectedDate && selectedTime;

    return (
        <div className="calendar-container">
            <div className="month-header">
                <button onClick={handlePrevMonth}>&lt;</button>
                {new Date(displayedYear, displayedMonth - 1).toLocaleString('default', { month: 'long' })} {displayedYear}
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days-header">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
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
            {selectedDate && (
                <div className="time-section">
                    <h3>Choose a Time:</h3>
                    <div className="time-buttons">
                        {Array.from({ length: 12 }, (_, index) => index + 9).map((hour) => (
                            <button
                                key={hour}
                                className={`time-button ${selectedTime === hour ? 'selected' : ''}`}
                                onClick={() => handleTimeClick(hour)}
                            >
                                {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <button
                className="reserve-button"
                onClick={() => console.log('Reservation button clicked')} // Remplacez cela par votre logique de réservation
                disabled={!isReservationButtonActive}
            >
                Reserve
            </button>
            {selectedDate && (
                <div className="selected-date">
                    Selected Date: {selectedDate}/{displayedMonth}/{displayedYear}
                </div>
            )}
        </div>
    );
};

export default Calendar;


