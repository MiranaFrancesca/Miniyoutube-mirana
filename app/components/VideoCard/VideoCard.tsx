// carte vidéo miniature 

import { Link } from "react-router";
import "./VideoCard.css";
import type { Video } from "~/data/videos";

type Props = {
    video: Video;
};

export function VideoCard({ video }: Props) {
    return (
        <article className="video-card">
            <Link to={`/video/${video.id}`} className="video-card__link">

                {/* miniature */}
                <div className="video-card__thumb-wrapper">
                    {video.thumbnail ? (
                        <img
                            //src={video.thumbnail}
                            //alt={video.title}
                            //className="video-card__thumb"
                        />
                    ) : (
                        <div className="video-card__thumb-placeholder">▶</div>
                    )}

                    <span className="video-card__duration">{video.duration}</span>
                </div>

                {/* bloc d'informations */}
                <div className="video-card__info">
                    <div className="video-card__avatar"></div>

                    <div className="video-card__texts">
                        <h3 className="video-card__title">{video.title}</h3>
                        <p className="video-card__channel">{video.channel}</p>
                        <p className="video-card__meta">
                            {video.views} • {video.publishedAt}
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    );
}
