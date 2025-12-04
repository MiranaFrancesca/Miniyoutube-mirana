// Page de connexion du TP Mini YouTube
// PAS une vraie authentification
// affiche un formulaire réaliste email et code tp
// dérive un pseudo depuis email pour le stocker dans le sessionStorage via VideoContext

import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useVideoContext } from "~/contexts/VideoContext";
import "./Login.css";

export default function LoginPage() {
    const { user, login, logout } = useVideoContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [tpCode, setTpCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    // gestion de la soumission du formulaire
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const valueEmail = email.trim();
        const valueCode = tpCode.trim();

        if (!valueEmail || !valueCode) {
            setError("Merci de saisir votre adresse e-mail et le code du TP.");
            return;
        }

        // pseudo dérivé de l'adresse email
        const pseudo = valueEmail.split("@")[0] || valueEmail;

        login(pseudo);
        setEmail("");
        setTpCode("");
        setError(null);

        navigate("/");
    };


    // cas utilisateur déjà connecté écran profil

    if (user) {
        return (
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-profile-header">
                        <div className="login-avatar">
                            {user.pseudo.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="login-profile-label">Connecté en tant que</p>
                            <p className="login-profile-name">{user.pseudo}</p>
                        </div>
                    </div>

                    <p className="login-profile-text">
                        Votre playlist et votre historique sont maintenant associés à ce
                        compte.
                    </p>

                    <div className="login-profile-buttons">
                        <button
                            onClick={() => navigate("/")}
                            className="btn-secondary"
                            type="button"
                        >
                            Retour à l'accueil
                        </button>

                        <button
                            onClick={logout}
                            className="btn-danger"
                            type="button"
                        >
                            Se déconnecter
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    // cas utilisateur non connecté formulaire

    return (
        <div className="login-wrapper">
            <div className="login-card">
                {/* en tête visuel de la carte */}
                <div className="login-header">
                    <div className="login-logo">M</div>

                    <div>
                        <h1 className="login-title">Connexion</h1>
                        <p className="login-subtitle">
                            Entrez vos informations pour accéder à MiniTube.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
                    {/* champ email */}
                    <label className="login-label">
                        Adresse e-mail
                        <input
                            type="email"
                            value={email}
                            placeholder="vous@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            className="login-input"
                        />
                    </label>

                    {/* champ code TP */}
                    <label className="login-label">
                        Code du TP
                        <input
                            type="text"
                            value={tpCode}
                            placeholder="ex : mini-youtube-2025"
                            onChange={(e) => setTpCode(e.target.value)}
                            autoComplete="off"
                            className="login-input"
                        />
                    </label>

                    {/* message erreur */}
                    {error && <p className="login-error">{error}</p>}

                    {/* bouton */}
                    <button type="submit" className="btn-primary">
                        Se connecter
                    </button>

                    {/* mention explicative */}
                    <p className="login-hint">
                        Pour ce TP, il ne s'agit pas d'une vraie authentification.
                        Le pseudo est dérivé de l'adresse e-mail et stocké dans le
                        <code> sessionStorage </code>.
                    </p>
                </form>
            </div>
        </div>
    );
}
