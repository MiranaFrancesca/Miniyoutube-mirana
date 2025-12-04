// page Playlist liste des vidéos ajoutées par l'utilisateur

import "./Playlist.css";

import { useVideoContext } from "~/contexts/VideoContext";
import { videos } from "~/data/videos";
import { VideoGrid } from "~/components/VideoGrid/VideoGrid";

export default function PlaylistPage() {
    const { user, playlist } = useVideoContext();

    // si pas connecté message 
    if (!user) {
        return (
            <main className="playlist-page">
                <h1 className="playlist-title">Playlists</h1>
                <p className="playlist-message playlist-message--info">
                    Vous devez être connecté pour accéder à votre playlist.
                </p>
            </main>
        );
    }

    // on récupère les vidéos dont id est dans la playlist
    const playlistVideos = videos.filter((video) =>
        playlist.includes(video.id),
    );

    return (
        <main className="playlist-page">
            <h1 className="playlist-title">
                Playlist de {user.pseudo}
            </h1>

            {playlistVideos.length === 0 ? (
                <p className="playlist-message playlist-message--empty">
                    Votre playlist est vide. Ajoutez des vidéos depuis leur page.
                </p>
            ) : (
                <section className="playlist-grid-wrapper">
                    {/* on réutilise le même composant que pour la Home */}
                    <VideoGrid videos={playlistVideos} />
                </section>
            )}
        </main>
    );
}
