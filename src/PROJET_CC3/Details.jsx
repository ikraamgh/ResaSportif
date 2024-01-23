import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setListItems } from "./ItemsSlice";
import "../index.css";
import { Header } from "./Header";

export default function Details() {
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

    return (
        <>
            <Header />
            <div className="container">
                <br />
                <div className="back-button">
                    <Link to={`/`}>
                        <img src={process.env.PUBLIC_URL +"../../../../../../../../PROJET_CC3/en-arriere.png"} alt="Back" style={{ width: '30px' }} />
                    </Link>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-center border-end">
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    className="img-fluid"
                                    style={{ maxWidth: "100%" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="pl-md-4">
                                    <h2>{selectedItem.title}</h2>
                                    <p className="text text-danger" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                                        {selectedItem.Prix}dh/h
                                    </p>
                                    <h6> - {selectedItem.description}</h6>
                                    <Link to={`/Details/Reservation/${selectedItem.id}`}>
                                        <button type="button" style={{ width: '100%' }} className="btn btn-danger">Réserver</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
