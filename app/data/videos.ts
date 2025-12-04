import videosJson from "./videos.json";

// type qui décrit une vidéo
export type Video = {
    id: string;
    title: string;
    channel: string;
    views: string;
    publishedAt: string;
    duration: string;

    //image et vraie vidéo locale 
    thumbnail?: string;
    videoUrl?: string;
};

// on typpe le json
export const videos: Video[] = videosJson as Video[];

