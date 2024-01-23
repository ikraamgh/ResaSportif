import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setListItems } from "./ItemsSlice";
import { Header } from "./Header";
import { useState } from "react";
import Footer from "./Footer";

export default function Informations() {
    const { id, selectedDate, displayedMonth, displayedYear, selectedTime } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        fetch(`https://mocki.io/v1/66489676-df51-41e4-bf64-e8360962df90`)
            .then((response) => response.json())
            .then((items) => {
                dispatch(setListItems(items));
            });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);
    const selectedItem = items.find((i) => i.id === id);

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="back-button">
                    <Link to={`/Details/Reservation/${id}`}>
                        <img src={"../../../../../../../../PROJET_CC3/en-arriere.png"} alt="Back" style={{ width: '30px' }} />
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <div className="container my-4">
                            <div className="container row">
                                <div className="col-md-6">
                                    <div>
                                        <h2 className="text text-danger">Renseignez vos informations</h2>
                                        <hr />
                                        <p>Donnez-nous plus de détails sur vous</p>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">Nom</label>
                                                <input type="text" className="form-control" maxLength="100" value={name} onChange={(e) => setName(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Adresse e-mail</label>
                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                        </div>
                                        <br />
                                        <div className="mb-3">
                                            <label className="form-label">Numéro de téléphone</label>
                                            <input type="tel" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Ajoutez votre message</label>
                                            <textarea className="form-control" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-4">
                                    <div>
                                        <p className="text text-danger">Détails de la réservation</p>
                                        <hr />
                                        <p>{selectedItem.title}</p>
                                        <p>Date sélectionnée: {`${selectedDate}/${displayedMonth}/${displayedYear}`}</p>
                                        <p>{`${selectedTime}:00 ${selectedTime < 12 ? 'AM' : 'PM'}`}</p>
                                    </div>
                                    <div>
                                        <hr />
                                        <p className="text text-danger">Détails du paiement</p>
                                        <p>Total</p>
                                        <p>{selectedItem.Prix} dh/h</p>
                                    </div>
                                    <div className="mb-3">
                                        <Link to={`/Payement/${selectedItem.id}`} >
                                            <button type="submit" style={{ width: '100%' }} className="btn btn-danger">
                                                Réserver
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}
