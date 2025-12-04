// page de lecture d'une vidéo format horizontal
// récupère id dans url video/:id
// ajoute url à l'historique via le VideoContext
// permet ajouter et retirer la vidéo de la playlist


import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import "./Video.css";

import { videos } from "~/data/videos";
import { useVideoContext } from "~/contexts/VideoContext";

export default function VideoPage() {
    const { id } = useParams();
    const location = useLocation();

    const { user, playlist, togglePlaylist, addToHistory } = useVideoContext();

    // on cherche la vidéo correspondant à id de url
    const video = videos.find((v) => v.id === id);

    // on arrive sur la page d'une vidéo on ajoute url dans historique.
    useEffect(() => {
        if (!video) return;
        addToHistory(location.pathname);
    }, [video, location.pathname, addToHistory]);

    // cas vidéo introuvable
    if (!video) {
        return (
            <main className="video-page video-page--not-found">
                <div className="video-not-found">
                    <h1>Vidéo introuvable</h1>
                    <p>La vidéo que vous cherchez n'existe pas ou plus.</p>
                </div>
            </main>
        );
    }

    const isInPlaylist = playlist.includes(video.id);

    return (
        <main className="video-page">
            {/* lecteurs infos */}
            <section className="video-main">
                <div className="video-player-wrapper">
                    <video
                        src={video.videoUrl}
                        poster={undefined} // miniature plus tard
                        controls
                        autoPlay
                        className="video-player"
                    />
                </div>

                <h1 className="video-title">{video.title}</h1>

                <p className="video-channel">{video.channel}</p>

                <p className="video-meta">
                    {video.views} • {video.publishedAt}
                </p>

                <div className="video-actions">
                    <button
                        type="button"
                        onClick={() => togglePlaylist(video.id)}
                        className="video-playlist-button"
                    >
                        {isInPlaylist
                            ? "Retirer de la playlist"
                            : "Ajouter à la playlist"}
                    </button>

                    {!user && (
                        <span className="video-login-hint">
                            Connectez-vous pour sauvegarder votre playlist.
                        </span>
                    )}
                </div>
            </section>

            {/* idée de video suggeré   */}
            <aside className="video-sidebar">
                <h2 className="video-sidebar-title">Vidéos suggérées</h2>
                <p className="video-sidebar-todo">
                    (TODO : afficher quelques autres vidéos ici)
                </p>
            </aside>
        </main>
    );
}
