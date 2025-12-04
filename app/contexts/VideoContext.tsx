// contexte global pour gérer :
// utilisateur connecté (sessionStorage)
// playlist (localStorage)
// historique des vidéos vues (localStorage)

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import type { ReactNode } from "react"; // import type obligatoire

type User = {
    id: string;
    pseudo: string;
};

type VideoContextValue = {
    user: User | null;
    login: (pseudo: string) => void;
    logout: () => void;
    playlist: string[]; // ids de vidéos
    togglePlaylist: (videoId: string) => void;
    history: string[]; // url ex: video/3
    addToHistory: (url: string) => void;
};

const VideoContext = createContext<VideoContextValue | undefined>(undefined);

const STORAGE_PREFIX = "miniYT";
const SESSION_USER_KEY = `${STORAGE_PREFIX}:user`;

function playlistKey(userId: string) {
    return `${STORAGE_PREFIX}:playlist:${userId}`;
}

function historyKey(userId: string) {
    return `${STORAGE_PREFIX}:history:${userId}`;
}

type VideoProviderProps = {
    children: ReactNode;
};

export function VideoProvider({ children }: VideoProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [playlist, setPlaylist] = useState<string[]>([]);
    const [history, setHistory] = useState<string[]>([]);

    // au montage on récupère l'utilisateur depuis le sessionStorage
    useEffect(() => {
        if (typeof window === "undefined") return;

        const stored = window.sessionStorage.getItem(SESSION_USER_KEY);
        if (stored) {
            try {
                const parsed: User = JSON.parse(stored);
                setUser(parsed);

                // on recharge playlist et historique liés à cet utilisateur
                const p = window.localStorage.getItem(playlistKey(parsed.id));
                const h = window.localStorage.getItem(historyKey(parsed.id));

                if (p) setPlaylist(JSON.parse(p));
                if (h) setHistory(JSON.parse(h));
            } catch {
                // si mon json corrompu on ignore
            }
        }
    }, []);

    // sauvegarde de la playlist des qu'elle change
    useEffect(() => {
        if (!user || typeof window === "undefined") return;
        window.localStorage.setItem(playlistKey(user.id), JSON.stringify(playlist));
    }, [playlist, user]);

    // sauvegarde historique des qu'il change
    useEffect(() => {
        if (!user || typeof window === "undefined") return;
        window.localStorage.setItem(historyKey(user.id), JSON.stringify(history));
    }, [history, user]);

    const login = (pseudo: string) => {
        if (typeof window === "undefined") return;

        // nettoyage du pseudo enlève les espaces inutiles
        //passe en minuscule pour avoir un identifiant stable
        const cleanPseudo = pseudo.trim();
        const userId = cleanPseudo.toLowerCase(); // même pseudo = même id

        const newUser: User = {
            id: userId,
            pseudo: cleanPseudo,
        };

        // on met à jour le state React
        setUser(newUser);

        // on garde l'utilisateur en session tant que l’onglet est ouvert
        window.sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(newUser));

        // on recharge la playlist et l’historique éventuels déjà associés à cet id
        const p = window.localStorage.getItem(playlistKey(userId));
        const h = window.localStorage.getItem(historyKey(userId));

        setPlaylist(p ? JSON.parse(p) : []);
        setHistory(h ? JSON.parse(h) : []);
    };


    const logout = () => {
        if (typeof window === "undefined") return;
        if (user) {
            window.sessionStorage.removeItem(SESSION_USER_KEY);
        }
        setUser(null);
        setPlaylist([]);
        setHistory([]);
    };

    const togglePlaylist = (videoId: string) => {
        if (!user) return; // on ne gère la playlist connecté

        setPlaylist((prev) =>
            prev.includes(videoId)
                ? prev.filter((id) => id !== videoId)
                : [...prev, videoId]
        );
    };

    const addToHistory = (url: string) => {
        if (!user) return;

        setHistory((prev) => {
            // on évite les doublons immédiats
            if (prev[prev.length - 1] === url) return prev;
            return [...prev, url];
        });
    };

    const value = useMemo<VideoContextValue>(
        () => ({
            user,
            login,
            logout,
            playlist,
            togglePlaylist,
            history,
            addToHistory,
        }),
        [user, playlist, history]
    );

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

// petit hook pratique 
export function useVideoContext() {
    const ctx = useContext(VideoContext);
    if (!ctx) {
        throw new Error(
            "useVideoContext doit être utilisé à l'intérieur de <VideoProvider>"
        );
    }
    return ctx;
}
