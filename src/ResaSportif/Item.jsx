import { Link } from "react-router-dom";

export default function Item({ id, title, prix, image }) {
    return (
        <div className="venue-card">
            <div className="venue-card-img-wrap">
                <img src={image} alt={title} />
                <span className="venue-badge">{title}</span>
            </div>
            <div className="venue-card-body">
                <div className="venue-title">{title}</div>
                <div className="venue-price">
                    {prix} <span>dh/heure</span>
                </div>
                <Link to={`/Details/${id}`} className="venue-btn">
                    Voir les détails →
                </Link>
            </div>
        </div>
    );
}