import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    //Home
    index("./routes/home.tsx"),

    //page vidéo
    route("video/:id", "./routes/video.vid.tsx"),

    //shorts
    route("shorts", "./routes/shorts.tsx"),

    //playlist
    route("playlist", "./routes/playlist.tsx"),

    //historique
    route("history", "./routes/history.tsx"),

    //connexion
    route("login", "./routes/login.tsx"),

] satisfies RouteConfig;
