import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListItems } from "./ItemsSlice";
import Item from './Item';
import "../index.css";
import { Header } from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const avis = [
    { id: 1, email: 'ahmed@ggmail.com', nom: 'Ahmed', avis: 'Très satisfait de la qualité de votre service' },
    { id: 2, email: 'said@gmail.com', nom: 'Said', avis: 'Les prix sont corrects et le bien est superbe' },
    { id: 3, email: 'achraf@gmail.com', nom: 'Achraf', avis: 'La location s\'est faite rapidement et en toute sécurité' },
];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        './PROJET_CC3/Home1.jpg',
        './PROJET_CC3/Home2.jpeg',
        './PROJET_CC3/Home3.jpg',
        './PROJET_CC3/Home4.jpg',
        './PROJET_CC3/Home5.png',
        './PROJET_CC3/Home6.png',
        './PROJET_CC3/Home7.jpg',
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex, images.length]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://mocki.io/v1/edf53efb-21b1-4db0-8885-87a0558fff96`)
            .then((response) => response.json())
            .then((items) => {
                dispatch(setListItems(items));
            });
    }, [dispatch]);

    const items = useSelector((state) => state.items.listItems);

    const [userAvis, setUserAvis] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNom, setUserNom] = useState('');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addAvis = () => {
        const newAvis = { id: avis.length + 1, nom: userNom, avis: userAvis };
        setUserAvis('');
        setUserEmail('');
        setUserNom('');
        avis.push(newAvis);
    };

    return (
        <div>
            <div className='bg'>
                <Header />
                
                <div className="home-container">
                    <div className="description-container">
                        <h1 style={{ color: "rgb(199, 0, 0)", fontSize: "2.5rem" }}><b>Reserver Les <br /> Meilleurs Salles <br /> De Sports Là</b></h1>
                        <br /><br />
                        <h4 className="description-text">
                            Bienvenue sur ResaSportive, votre plateforme de réservation d'installations sportives. Réservez facilement des salles de sport, de gym, de danse et bien plus encore.
                        </h4>
                        <br /><br />
                        <div>
                            <Link to="/login">
                                <button className='btn btn-red'><h6>Se Connecter</h6></button>
                            </Link>
                        </div>
                    </div>
                    <img
                        src={images[currentImageIndex]}
                        alt={`Image ${currentImageIndex + 1}`}
                        style={{ width: '100%', height: 700 }}
                    />
                </div>

                <br />
                
                <div className="advantages-container">
                    <div className="advantage">
                        <img src="PROJET_CC3/icone-avantage1.png" alt="Avantage 1" />
                        <h6>Facilité de Réservation</h6>
                    </div>
                    <div className="advantage">
                        <img src="PROJET_CC3/icone-avantage2.png" alt="Avantage 2" />
                        <h6 style={{ color: "#383838" }}>Diversité d'Installations</h6>
                    </div>
                    <div className="advantage">
                        <img src="PROJET_CC3/icone-avantage3.png" alt="Avantage 3" />
                        <h6>Gestion de Compte Personnalisée</h6>
                    </div>
                </div>

                <br />
                <br />
                
                <div className="bg2">
                    <br />
                    <div className="container">
                        <h1 className='text-center'><b>Salles Disponible</b></h1>
                        <br />
                        <div className="row">
                            {items.map((item, index) => (
                                <div className="col-4" key={index}>
                                    <Item
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        prix={item.Prix}
                                        image={item.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                
                <section className="avis-section">
                    <h1 className="text-center">Avis Client</h1>
                    <div className="avis-container">
                        {avis.map((avi) => (
                            <div className="avis" key={avi.id}>
                                <h2>{avi.nom}</h2>
                                <h6>{avi.avis}</h6>
                            </div>
                        ))}
                    </div>
                    <br /><hr />
                    <p>Veuillez partager votre expérience avec nous et nous faire savoir si <br /> nous pourrions faire quelque chose pour nous améliorer.</p>
                    <br />
                    <div className="avis-container">
                        <input type="text" style={{ marginBottom: 20, marginRight: 50, width: 400 }} className='form-control' placeholder="Entrez votre nom ici..." value={userNom} onChange={(e) => setUserNom(e.target.value)} />
                        <br />
                        <input type="text" style={{ marginBottom: 20, width: 400 }} className='form-control' placeholder="Entrez votre email ici..." value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        <br />
                        <br />
                        <textarea type="text" style={{ marginRight: 40, width: 400 }} className='form-control' placeholder="Entrez votre avis ici..." value={userAvis} onChange={(e) => setUserAvis(e.target.value)} />
                        <br />
                        <button style={{ margin: 10, marginRight: 100, width: 300 }} className='btn btn-secondary' onClick={addAvis}>Ajouter votre avis</button>
                    </div>
                </section>
                <br />
            </div>

            <br />
            
            <section>
                <div className="container">
                    <h1 className="text-center">Avez-vous quelque chose à dire?</h1>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <br />
                            <br />
                            <p style={{ marginLeft: 50, height: 40, width: 400 }}>Faites-nous part de vos questions, suggestions et préoccupations en remplissant le formulaire de contact ci-dessous.</p>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" style={{ margin: 10, height: 40, width: 300 }} className="with-bottom-line" placeholder="Votre telephone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <textarea type="text" style={{ margin: 10, height: 40, width: 300 }} className="with-bottom-line" placeholder="Votre message" value={message} onChange={(e) => setMessage(e.target.value)} />
                                </div>
                                <button type="submit" style={{ margin: 10, height: 40, width: 300 }} className="btn btn-danger">Envoyer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <br /><br /><br />
            
            <Footer />

        </div>
    );
};

export default Home;
