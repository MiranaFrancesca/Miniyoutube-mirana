import { useSearchParams } from "react-router";
import { videos } from "~/data/videos";
import { VideoGrid } from "~/components/VideoGrid/VideoGrid";

import "./Home.css";

const FILTERS = ["Tous", "Musique", "Jeux vidéo", "Podcasts", "Mix", "React"];

export default function Home() {
    const [searchParams] = useSearchParams();

    // on récupère ?q=... dans url
    const rawQuery = searchParams.get("q") ?? "";
    const query = rawQuery.trim().toLowerCase();

    // filtrage des vidéos par titre entier et partiel
    const filteredVideos = query
        ? videos.filter((video) =>
            video.title.toLowerCase().includes(query)
        )
        : videos;

    return (
        <section className="home-page">
            {/* barre de catégories / filtres */}
            <div className="home-filters">
                {FILTERS.map((filter, index) => (
                    <button
                        key={filter}
                        type="button"
                        className={
                            "home-filter-btn" +
                            (index === 0 ? " home-filter-btn--active" : "")
                        }
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* texte de résultat en mode recherche */}
            {query && (
                <p className="home-search-result">
                    Résultats pour <strong>{rawQuery}</strong>
                </p>
            )}

            {/* grille de vidéos ou message si aucun résultat */}
            <div className="home-video-grid">
                {filteredVideos.length === 0 ? (
                    <p className="home-empty">
                        Aucune vidéo trouvée pour "{rawQuery}".
                    </p>
                ) : (
                    <VideoGrid videos={filteredVideos} />
                )}
            </div>
        </section>
    );
}
