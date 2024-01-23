import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";
import { Provider } from "react-redux";
import store from "./Store";
import Login from "./Login";
import SignUp from "./SignUp";
import Reservation from "./Reservation";
import Informations from "./Informations";
import Payement from "./Payement";
import Item from "./Item";

export default function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Services" element={<Item />} />
                    <Route path="/Details/:id" element={<Details />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="Details/Reservation/:id" element={<Reservation />} />
                    <Route path="Details/Reservation/Informations/:id/:selectedDate/:displayedMonth/:displayedYear/:selectedTime/" element={<Informations />} />
                    <Route path="/Payement/:id" element={<Payement />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
