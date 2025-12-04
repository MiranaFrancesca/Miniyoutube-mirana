
// Page "Historique de visionnage".
// si l'utilisateur n'est pas connecté message explicatif
// si connecté on lit le tableau history du contexte qui contient des url
// enrichit les url avec les données de videos et shorts


import "./History.css";
import { Link } from "react-router";
import { useVideoContext } from "~/contexts/VideoContext";
import { videos } from "~/data/videos";
import { shorts } from "~/data/shorts";
import type { Video } from "~/data/videos";
import type { ShortVideo } from "~/data/shorts";

// union typée une entrée historique peut être une vidéo ou un short
type HistoryItem =
    | { kind: "video"; key: string; video: Video }
    | { kind: "short"; key: string; short: ShortVideo };

export default function HistoryPage() {
    const { user, history } = useVideoContext();


    // pas connecté simple message

    if (!user) {
        return (
            <main className="history-page">
                <div className="history-inner">
                    <h1 className="history-title">Historique de visionnage</h1>
                    <p className="history-empty">
                        Vous devez être connecté pour voir votre historique.
                    </p>
                </div>
            </main>
        );
    }


    // convertit chaque string de history en objet 

    const items: HistoryItem[] = history
        .map((entry) => {
            // /video/:id
            if (entry.startsWith("/video/")) {
                const id = entry.replace("/video/", "");
                const video = videos.find((v) => v.id === id);
                if (!video) return null;

                return {
                    kind: "video" as const,
                    key: entry,
                    video,
                };
            }

            // shorts/:id
            if (entry.startsWith("/shorts/")) {
                const id = entry.replace("/shorts/", "");
                const short = shorts.find((s) => s.id === id);
                if (!short) return null;

                return {
                    kind: "short" as const,
                    key: entry,
                    short,
                };
            }

            // url qu'on ne reconnaît pas on ignore
            return null;
        })
        .filter((item): item is HistoryItem => item !== null)
        .reverse();


    // rendu

    return (
        <main className="history-page">
            <div className="history-inner">
                {/* en tête  et filtres visuels */}
                <header className="history-header">
                    <h1 className="history-title">Historique de visionnage</h1>

                    <div className="history-filters">
                        <button className="history-filter history-filter--active">
                            Tout
                        </button>
                        <button className="history-filter">Vidéos</button>
                        <button className="history-filter">Shorts</button>
                        <button className="history-filter">Playlists</button>
                        <button className="history-filter">Musique</button>
                    </div>
                </header>

                {items.length === 0 ? (
                    <p className="history-empty">
                        Aucun contenu dans votre historique pour le moment.
                    </p>
                ) : (
                    <section className="history-section">
                        <h2 className="history-section-title">Récemment</h2>

                        <ul className="history-list">
                            {items.map((item) => {
                                // cas video
                                if (item.kind === "video") {
                                    const v = item.video;

                                    return (
                                        <li
                                            key={item.key}
                                            className="history-item history-item--video"
                                        >
                                            <Link
                                                to={`/video/${v.id}`}
                                                className="history-thumb-link"
                                            >
                                                <div className="history-thumb-wrapper">
                                                    <img
                                                        src={v.thumbnail}
                                                        alt={v.title}
                                                        className="history-thumb"
                                                    />
                                                    <span className="history-duration">
                                                        {v.duration}
                                                    </span>
                                                </div>
                                            </Link>

                                            <div className="history-texts">
                                                <h3 className="history-video-title">
                                                    {v.title}
                                                </h3>
                                                <p className="history-channel">
                                                    {v.channel}
                                                </p>
                                                <p className="history-meta">
                                                    {v.views} • Visionné récemment
                                                </p>
                                            </div>
                                        </li>
                                    );
                                }

                                // cas shorts
                                const s = item.short;

                                return (
                                    <li
                                        key={item.key}
                                        className="history-item history-item--short"
                                    >
                                        {/* on renvoie vers la page des shorts */}
                                        <Link
                                            to="/shorts"
                                            className="history-thumb-link"
                                        >
                                            <div className="history-thumb-wrapper history-thumb-wrapper--short">
                                                <img
                                                    src={s.thumbnail}
                                                    alt={s.title}
                                                    className="history-thumb history-thumb--short"
                                                />
                                                <span className="history-badge-short">
                                                    Shorts
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="history-texts">
                                            <h3 className="history-video-title">
                                                {s.title}
                                            </h3>
                                            <p className="history-channel">@minitube</p>
                                            <p className="history-meta">
                                                {s.views} • Visionné récemment
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </div>
        </main>
    );
}
