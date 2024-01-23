import React, { useEffect } from "react";
import { setListItems } from "./ItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import Footer from "./Footer";

export default function Payement() {
    const { id, selectedDate, displayedMonth, displayedYear, selectedTime } = useParams();
    const dispatch = useDispatch();
    const [nameCard, setNameCard] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [MMYY, setMMYY] = useState("");
    const [cvvCode, setCvvCode] = useState("");

    useEffect(() => {
        fetch(`https://mocki.io/v1/fb3369dc-9221-4532-a242-afd2a2bac9fb`)
            .then((response) => response.json())
            .then((items) => {
                dispatch(setListItems(items));
            });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);
    const selectedItem = items.find((i) => i.id === id);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="back-button">
                    <Link to={`/Details/Reservation/Informations/${selectedItem.id}/${selectedDate}/${displayedMonth}/${displayedYear}/${selectedTime}`}>
                        <img className="img" src={"../../PROJET_CC3/en-arriere.png"} alt="Back" style={{ width: '30px' }} />
                    </Link>
                </div>
                <br />
                <div class="container cont">
                    <div class="row">
                        <div class="col-lg-4 mb-lg-0 mb-3">
                            <div class="card_Pay p-3">
                                <div class="img-box">
                                    <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="" />
                                </div>
                                <div class="number">
                                    <label class="fw-bold" for="">**** **** **** 1060</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-lg-0 mb-3">
                            <div class="card_Pay p-3">
                                <div class="img-box">
                                    <img src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png"
                                        alt="" />
                                </div>
                                <div class="number">
                                    <label class="fw-bold">**** **** **** 1060</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-lg-0 mb-3">
                            <div class="card_Pay p-3">
                                <div class="img-box">
                                    <img src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png"
                                        alt="" />
                                </div>
                                <div class="number">
                                    <label class="fw-bold">**** **** **** 1060</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <div class="card_Pay p-3">
                                <p class="mb-0 fw-bold h4">Payment Methods</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="card_Pay p-3">
                                <div class="card-body_Pay border p-0">
                                    <p>
                                        <a class="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                                            data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                            aria-controls="collapseExample">
                                            <span class="fw-bold">PayPal</span>
                                        </a>
                                    </p>
                                    <div class="collapse p-3 pt-0" id="collapseExample">
                                        <div class="row">
                                            <div class="col-8">
                                                <p class="h4 mb-0">Summary</p>
                                                <p class="mb-0">
                                                    <span class="fw-bold">Salle:</span>
                                                    <span className='text text-danger'> {selectedItem.title}</span>
                                                </p>
                                                <p class="mb-0">
                                                    <span class="fw-bold">Price:</span>
                                                    <span className='text text-danger'> {selectedItem.Prix} DH</span>
                                                </p>
                                                <p class="mb-0">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
                                                    nihil neque
                                                    quisquam aut
                                                    repellendus, dicta vero? Animi dicta cupiditate, facilis provident quibusdam ab
                                                    quis,
                                                    iste harum ipsum hic, nemo qui!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body_Pay border p-0">
                                    <p>
                                        <a class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                            data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true"
                                            aria-controls="collapseExample">
                                            <span class="fw-bold">Credit Card</span>
                                        </a>
                                    </p>
                                    <div class="collapse show p-3 pt-0" id="collapseExample">
                                        <div class="row">
                                            <div class="col-lg-5 mb-lg-0 mb-3">
                                                <p class="h4 mb-0">Summary</p>
                                                <p class="mb-0">
                                                    <span class="fw-bold">Salle:</span>
                                                    <span className='text text-danger'> {selectedItem.title}</span>
                                                </p>
                                                <p class="mb-0">
                                                    <span class="fw-bold">Price:</span>
                                                    <span className='text text-danger'> {selectedItem.Prix} DH</span>
                                                </p>
                                                <p class="mb-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
                                                    nihil neque
                                                    quisquam aut
                                                    repellendus, dicta vero? Animi dicta cupiditate, facilis provident quibusdam ab
                                                    quis,
                                                    iste harum ipsum hic, nemo qui!</p>
                                            </div>
                                            <div class="col-lg-7">
                                                <form action="" class="form" onSubmit={handleSubmit}>
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="form__div">
                                                                <div className="form-group">
                                                                    <input type="text" style={{ margin: 10, height: 40, width: 660 }} className="with-bottom-line" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form__div">
                                                                <div className="form-group">
                                                                    <input type="text" style={{ margin: 10, height: 40, width: 300 }} className="with-bottom-line" placeholder="MM / yy" value={MMYY} onChange={(e) => setMMYY(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form__div">
                                                                <div className="form-group">
                                                                    <input type="text" style={{ margin: 10, height: 40, width: 300 }} className="with-bottom-line" placeholder="cvv code" value={cvvCode} onChange={(e) => setCvvCode(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="form__div">
                                                                <div className="form-group">
                                                                    <input type="text" style={{ margin: 10, height: 40, width: 660 }} className="with-bottom-line" placeholder="name on the card" value={nameCard} onChange={(e) => setNameCard(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="btn btn-danger w-100">Payer {selectedItem.Prix} DH</div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
