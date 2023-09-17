import { FC } from "react";
import { IQuickSearchResult } from "../types/tmdb.types";
import AppPicture from "./AppPicture";

interface QuickSearchHitsProps {
    searchHits: IQuickSearchResult[];
}

const SearchHitsItem = (hit: IQuickSearchResult) => {
    return (
        <li className="quick-search-hits__item" key={hit.id}>
            <AppPicture img={hit.poster} alt={hit.title} hasLoading={false} />
            <div className="quick-search-hits__content">
                <a href={hit.link} className="quick-search-hits__link">{hit.title}</a>
                {hit.year && <span className="quick-search-hits__year">&nbsp;({hit.year})</span>}
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