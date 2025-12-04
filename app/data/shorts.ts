import shortsJson from "./shorts.json";



export type ShortVideo = {
    id: string;
    title: string;
    views: string;
    thumbnail: string;
    videoUrl: string;
};


//liste typee des videos short 
export const shorts: ShortVideo[] = shortsJson;
