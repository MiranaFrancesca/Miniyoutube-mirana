import "./Shorts.css";
import { shorts } from "~/data/shorts";
import { ShortCard } from "~/components/ShortCard/ShortCard";


export default function ShortsPage() {
    return (
        <section className="shorts-scroll-container">
            {shorts.map((short) => (
                <ShortCard key={short.id} short={short} />
            ))}
        </section>
    );
}
