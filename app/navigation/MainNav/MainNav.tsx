import "./MainNav.css";
import { NavLink } from "react-router";

type NavItemDef = {
    to: string;
    label: string;
    iconSrc: string; // chemin vers le svg dans public
};

const NAV_ITEMS: NavItemDef[] = [
    { to: "/", label: "Accueil", iconSrc: "/assets/icons/home.svg" },
    { to: "/shorts", label: "Shorts", iconSrc: "/assets/icons/shorts.svg" },
    { to: "/history", label: "Historique", iconSrc: "/assets/icons/history.svg" },
    { to: "/playlist", label: "Playlists", iconSrc: "/assets/icons/playlist.svg" },
    { to: "/login", label: "Connexion", iconSrc: "/assets/icons/user.svg" },
];

export function MainNav() {
    return (
        <aside className="yt-nav">
            <nav className="yt-nav__section">
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.to}
                        to={item.to}
                        label={item.label}
                        iconSrc={item.iconSrc}
                    />
                ))}
            </nav>
        </aside>
    );
}

type NavItemProps = {
    to: string;
    label: string;
    iconSrc: string;
};

function NavItem({ to, label, iconSrc }: NavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                ["yt-nav__item", isActive ? "yt-nav__item--active" : ""].join(" ")
            }
        >
            <img
                src={iconSrc}
                alt=""                // décoratif alt vide
                className="yt-nav__icon"
            />
            <span>{label}</span>
        </NavLink>
    );
}
