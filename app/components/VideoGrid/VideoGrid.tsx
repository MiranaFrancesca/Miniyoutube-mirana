// grille responsive affichant une liste de cartes vidéo 


import "./VideoGrid.css";
import type { Video } from "~/data/videos";
import { VideoCard } from "~/components/VideoCard/VideoCard";

type Props = {
    videos: Video[];
};

export function VideoGrid({ videos }: Props) {
    return (
        <section className="video-grid">
            <div className="video-grid__inner">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
}
