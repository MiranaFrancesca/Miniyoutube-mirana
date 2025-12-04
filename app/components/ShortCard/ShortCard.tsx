// Carte affichant un Short : vidéo verticale + actions
// enregistrement dans l'historique quand on clique

import "./ShortCard.css";
import type { ShortVideo } from "~/data/shorts";
import { useVideoContext } from "~/contexts/VideoContext";

type Props = {
    short: ShortVideo;
};

// centralisation des chemins d’icônes svg
const SHORT_ICONS = {
    like: "/assets/icons/short-like.svg",
    dislike: "/assets/icons/short-dislike.svg",
    comment: "/assets/icons/short-comment.svg",
    share: "/assets/icons/short-share.svg",
} as const;

export function ShortCard({ short }: Props) {
    const { addToHistory } = useVideoContext();

    //utilisateur interagit avec le short

    // on ajoute url dans historique
    const handleClick = () => {
        addToHistory(`/shorts/${short.id}`);
    };

    return (
        <article className="short-item" onClick={handleClick}>
            {/* short vertical */}
            <div className="short-video-wrapper">
                {/* Vidéo du Short */}
                <video
                    src={short.videoUrl}
                    poster={short.thumbnail} // image d’attente avant lecture
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* informations en bas de la vidéo */}
                <div className="short-info-overlay">
                    <p className="short-channel">@minitube</p>
                    <p className="short-title">{short.title}</p>
                    <p className="short-views">{short.views}</p>
                </div>
            </div>

            {/*like dislike commentaire partager */}
            <div className="short-actions">
                {/* j'aime */}
                <button type="button" className="short-action" aria-label="J'aime">
                    <div className="short-action-circle">
                        <img
                            src={SHORT_ICONS.like}
                            alt=""
                            className="short-action-icon"
                        />
                    </div>
                    <span className="short-action-count">74 k</span>
                </button>

                {/*j'aime pas */}
                <button
                    type="button"
                    className="short-action"
                    aria-label="Je n'aime pas"
                >
                    <div className="short-action-circle">
                        <img
                            src={SHORT_ICONS.dislike}
                            alt=""
                            className="short-action-icon"
                        />
                    </div>
                </button>

                {/*commentaires */}
                <button
                    type="button"
                    className="short-action"
                    aria-label="Commentaires"
                >
                    <div className="short-action-circle">
                        <img
                            src={SHORT_ICONS.comment}
                            alt=""
                            className="short-action-icon"
                        />
                    </div>
                    <span className="short-action-count">134</span>
                </button>

                {/* partager */}
                <button
                    type="button"
                    className="short-action"
                    aria-label="Partager"
                >
                    <div className="short-action-circle">
                        <img
                            src={SHORT_ICONS.share}
                            alt=""
                            className="short-action-icon"
                        />
                    </div>
                    <span className="short-action-count">Partager</span>
                </button>
            </div>
        </article>
    );
}
