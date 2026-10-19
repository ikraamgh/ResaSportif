import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setListItems } from "./ItemsSlice";
import "../index.css";
import { Header } from "./Header";
import Footer from "./Footer";

export default function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();

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
                <Link to="/" className="rs-back-link">← Retour à l'accueil</Link>

                <div className="row g-5 align-items-start mt-1">
                    {/* Image */}
                    <div className="col-md-6">
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.title}
                            className="details-hero-img"
                        />
                    </div>

                    {/* Info */}
                    <div className="col-md-6">
                        <div className="venue-badge" style={{ position:'static', display:'inline-block', marginBottom:16 }}>
                            {selectedItem.title}
                        </div>
                        <h1 style={{ fontSize:'2rem', color:'var(--green-deep)', marginBottom:16 }}>
                            {selectedItem.title}
                        </h1>
                        <div className="details-price-badge">
                            {selectedItem.Prix} dh / heure
                        </div>
                        <p style={{ color:'var(--text-secondary)', lineHeight:1.7, marginBottom:32 }}>
                            {selectedItem.description}
                        </p>
                        <Link to={`/Details/Reservation/${selectedItem.id}`}>
                            <button className="btn-rs-primary btn-rs-full">
                                Réserver ce terrain →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
