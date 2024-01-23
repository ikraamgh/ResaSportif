import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('SIGN UP:', { username, password });
    };

    return (
        <>
            <Header />
            <div className="signup-page" style={{ backgroundImage: `url('./PROJET_CC3/background.jpg')`, width: '100%' }}>
                <div className='card_S'>
                <div className="back-button">
                    <Link to={`/`}>
                        <img src={"./PROJET_CC3/en-arriere.png"} alt="Back" style={{ width: '30px' }} />
                    </Link>
                </div>
                    <h1 className='text-center '>Se connecter</h1>
                    <form className="card_S2">
                        <label><h6>Nom utilisateur: </h6></label>
                        <br />
                        <input className='form-control px-3' style={{ width: 370 }} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label><h6>Mot de passe: </h6></label>
                        <br />
                        <input className='form-control ' style={{ width: 370 }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <br />
                    </form>
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-danger' style={{ width: 300 }} type="button" onClick={handleSignUp}>
                            <b>Se connecter</b>
                        </button>
                    </div>
                    <br />
                    <div class="login-separator-wrapper">
                        <div class="login-separator-component split-line">
                            <span class="separator-line"></span>
                            <h5>Ou connectez-vous avec</h5>
                            <span class="separator-line"></span>
                        </div>
                    </div>
                    <br />
                    <h6 className="card_S3">
                        Already have an account? <span className="text-danger font-weight-bold"><Link to="/login">Log in</Link></span>
                    </h6>
                </div>
            </div>
        </>
    );
};