import tmdb from "../js/tmdb-api";
import MediaHero from "./MediaHero";

export default function RandomMedia() {
    const id = tmdb.getRandomCollectionId();

    return (
        <div className="random-media">
            <MediaHero type='collection' id={id} withLink={true} />
        </div>
    )
}