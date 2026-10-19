import React from "react";

export default function Footer() {
    return (
        <footer className="rs-footer">
            <div className="container">
                <div className="row g-5">
                    {/* Brand column */}
                    <div className="col-lg-4 col-md-6">
                        <div className="rs-footer-brand">
                            <span>Resa</span>Sportif
                        </div>
                        <p className="rs-footer-tagline">
                            Votre plateforme de réservation d'installations sportives.
                            Réservez facilement des terrains de sport en quelques clics.
                        </p>
                    </div>

                    {/* Links column */}
                    <div className="col-lg-2 col-md-6">
                        <h6>Navigation</h6>
                        <ul className="rs-footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="#salles">Services</a></li>
                            <li><a href="#avis">Avis</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal column */}
                    <div className="col-lg-2 col-md-6">
                        <h6>Légal</h6>
                        <ul className="rs-footer-links">
                            <li><a href="#">Conditions</a></li>
                            <li><a href="#">Confidentialité</a></li>
                            <li><a href="#">Cookies</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div className="col-lg-4 col-md-6">
                        <h6>Contact</h6>
                        <div className="rs-footer-contact-item">
                            <span className="contact-icon">📍</span>
                            <span>444 S. Cedros Ave, Solana Beach, California</span>
                        </div>
                        <div className="rs-footer-contact-item">
                            <span className="contact-icon">📞</span>
                            <span>+1.555.555.5555</span>
                        </div>
                        <div className="rs-footer-contact-item">
                            <span className="contact-icon">✉️</span>
                            <a href="mailto:support@resasportif.com" style={{color:'inherit'}}>
                                support@resasportif.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rs-footer-bottom">
                <div className="container">
                    © {new Date().getFullYear()} ResaSportif. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}