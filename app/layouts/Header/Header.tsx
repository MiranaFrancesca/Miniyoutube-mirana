import "./Header.css";
import type { FormEvent } from "react";
import { useNavigate, NavLink } from "react-router";

export function Header() {
    const navigate = useNavigate();

    // Gestion de la recherche
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const raw = String(formData.get("q") ?? "");
        const query = raw.trim();

        // Si mon champ est vide on revient sur la home normale
        if (!query) {
            navigate("/");
            return;
        }

        // on ajoute ?q=... dans URL
        navigate(`/?q=${encodeURIComponent(query)}`);
    };

    return (
        <header className="yt-header">
            {/* Logo MiniTube cliquable */}
            <NavLink to="/" className="yt-header__logo">
                <img
                    src="/assets/logo/minitube-logo.svg"
                    alt="MiniTube logo"
                    className="yt-header__logo-icon"
                />
                <span className="yt-header__logo-text">MiniTube</span>
            </NavLink>

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="yt-header__search">
                <input
                    name="q"
                    type="search"
                    placeholder="Rechercher"
                    className="yt-header__search-input"
                />

                <button type="submit" className="yt-header__search-button">
                    <img
                        src="/assets/icons/search.svg"
                        alt=""
                        className="yt-header__search-button-icon"
                    />
                </button>
            </form>

            {/* Icônes à droite */}
            <div className="yt-header__right">
                <button className="yt-header__icon">
                    <img
                        src="/assets/icons/create.svg"
                        alt=""
                        className="yt-header__icon-img"
                    />
                </button>

                <button className="yt-header__icon">
                    <img
                        src="/assets/icons/bell.svg"
                        alt=""
                        className="yt-header__icon-img"
                    />
                </button>

                <div className="yt-header__avatar">M</div>
            </div>
        </header>
    );
}
