import { FC } from "react";
import { ISearchResult } from "../types/tmdb.types";
import AppPicture from "./AppPicture";

interface QuickSearchHitsProps {
    searchHits: ISearchResult[];
}

const SearchHitsItem = (hit: ISearchResult) => {
    return (
        <li className="quick-search-hits__item" key={hit.id}>
            <AppPicture img={hit.poster} alt={hit.title} hasLoading={false} />
            <div className="quick-search-hits__content">
                <a href={hit.link} className="quick-search-hits__link">{hit.title}</a>
                <span className="quick-search-hits__type">{hit.type}</span>
            </div>
        </li>
    )
}

export const QuickSearchHits: FC<QuickSearchHitsProps> = ({ searchHits }) => {
    return (
        <section className="quick-search-hits">
            {searchHits.length === 0
                ? <p className="quick-search-hits__empty">No results. Try to start searching/another search phrase</p>
                : <ul className="quick-search-hits__list">
                    {searchHits.map((hit) => SearchHitsItem(hit))}
                </ul>
            }
        </section>
    )
}