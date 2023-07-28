import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import MovieCrew from '../components/MovieCrew';
import AppTile from '../components/AppTile';
import SearchForm from '../components/SearchForm';
import AppDialog from '../components/AppDialog';

export default function Movie() {
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  const openSearchDialog = () => setIsSearchFormOpen(true);
  const closeSearchDialog = () => setIsSearchFormOpen(false);

  return (
    <>
      <AppHeader openSearch={openSearchDialog} />
      <section className="movie-header">
        <MediaHero data={heroMovie} isRandom={false} />
        <AppSection extraClass="m-movie_crew">
          <div className="container">
            <MovieCrew members={movieCrew} />
            <AppSectionHeader title="crew" />
          </div>
        </AppSection>
        <div className="l-content container">
          <AppSection>
            <AppSectionHeader title="cast" />
            <div className="l-tiles_grid m-people">
              {movieCast.map((castMember) => <AppTile tile={castMember} type="actor" />)}
            </div>
          </AppSection>
        </div>
      </section>

      <AppDialog isOpened={isSearchFormOpen} onClose={closeSearchDialog}>
        <SearchForm />
      </AppDialog>
    </>
  )
}
