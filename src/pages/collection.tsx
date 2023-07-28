import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import SearchForm from '../components/SearchForm';
import AppDialog from '../components/AppDialog';

export default function Collection() {
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  const openSearchDialog = () => setIsSearchFormOpen(true);
  const closeSearchDialog = () => setIsSearchFormOpen(false);

  return (
    <>
      <AppHeader openSearch={openSearchDialog} />

      <section className="movie-header">
        <MediaHero data={heroCollection} isRandom={false} />
      </section>
      <div className="l-content container">
        <AppSection extraClass='m-movies_list'>
          <AppSectionHeader title={`${movies.length} parts`} hasSelect={true} />
          <div className="l-tiles_grid m-movies">
            {movies.map((movie) => <AppTile tile={movie} type="movie" />)}
          </div>
        </AppSection>
      </div>

      <AppDialog isOpened={isSearchFormOpen} onClose={closeSearchDialog}>
        <SearchForm />
      </AppDialog>
    </>
  )
}
