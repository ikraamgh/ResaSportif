import { Link } from "react-router-dom";

export default function Item(props) {
    return (
        <div>
            <div className="m-1">
                <div className="card shadow-sm C">
                    <img className="bd-placeholder-img card-img-top" src={`${props.image}`} alt="" style={{ width: '100%', height: 300 }} />
                    <div className="card-body" style={{ width: '100%' }}>
                        <h3 className="card-title" >{props.title}</h3><br />
                        <h5 className="card-text"> {props.prix} dh/h</h5>
                        <Link to={`/Details/${props.id}`}>
                            <button type="button" style={{ width: '100%' }} className="btn btn-danger">Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}