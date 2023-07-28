import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import AppTile from '../components/AppTile';
import SearchForm from '../components/SearchForm';
import AppDialog from '../components/AppDialog';

export default function Search() {
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  const openSearchDialog = () => setIsSearchFormOpen(true);
  const closeSearchDialog = () => setIsSearchFormOpen(false);

  return (
    <>
      <AppHeader openSearch={openSearchDialog} />

      <section className="l-search_header container">
        <SearchForm />
      </section>
      <div className="l-content container">
        <header className="container__header">
          <p>Search results for <mark className='search-term'><strong>fast furious</strong></mark></p>
        </header>
        <AppSection extraClass='m-movies_list'>
          <AppSectionHeader title={`${movies.length} movies`} alignStart={true} />
          <div className="l-tiles_grid m-movies">
            {movies.map((movie) => <AppTile tile={movie} type="movie" key={movie.id} />)}
          </div>
        </AppSection>
        <AppSection extraClass='m-movies_list'>
          <AppSectionHeader title={`${collections.length} collections`} alignStart={true} />
          <div className="l-tiles_grid m-movies">
            {collections.map((collection) => <AppTile tile={collection} type="collection" key={collection.id} />)}
          </div>
        </AppSection>
        <AppSection extraClass='m-movies_list'>
          <AppSectionHeader title={`${trandingShows.length} TV shows`} alignStart={true} />
          <div className="l-tiles_grid m-movies">
            {trandingShows.map((show) => <AppTile tile={show} type="movie" key={show.id} />)}
          </div>
        </AppSection>
      </div>

      <AppDialog isOpened={isSearchFormOpen} onClose={closeSearchDialog}>
        <SearchForm />
      </AppDialog>
    </>
  )
}
