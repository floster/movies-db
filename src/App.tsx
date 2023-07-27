import { useState } from 'react';
import './app.scss'
import AppHeader from './components/AppHeader';
import AppSection from './components/AppSection';
import MainPageSidebar from './components/MainPageSidebar';
import AppSectionHeader from './components/AppSectionHeader';
import MediaHero from './components/MediaHero';
import AppCarousel from './components/AppCarousel';
// import MovieCrew from './components/MovieCrew';
// import AppTile from './components/AppTile';
import SearchForm from './components/SearchForm';
import AppDialog from './components/AppDialog';

import data from './data.json'

export default function App() {
  // const [collections] = useState(data.collections);
  // const [heroMovie] = useState(data.hero.movie);
  // const [heroCollection] = useState(data.hero.collection);
  // const [movieCrew] = useState(data.movie.crew);
  // const [movieCast] = useState(data.movie.cast);
  const [trandingMovies] = useState(data.tranding_movies);
  const [trandingShows] = useState(data.tranding_shows);
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  const openSearchDialog = () => setIsSearchFormOpen(true);
  const closeSearchDialog = () => setIsSearchFormOpen(false);

  return (
    <>
      <AppHeader openSearch={openSearchDialog} />

      {/* ================= Search results Page =================  */}
      {/*
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
      */}
      {/* ================= Collection Page =================  */}
      {/*
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
      */}
      {/* ================= Movie Page =================  */}
      {/*
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
      */}
      {/* ================= Main page =================  */}
      <div className="l-content m-main_page container">
        <MainPageSidebar />
        <main className="l-main_page_content">
          <AppSection extraClass="m-random_media">
            <AppSectionHeader title="random collection" />
            <MediaHero type='random' />
          </AppSection>

          <AppSection>
            <AppSectionHeader title="trending movies" />
            <AppCarousel items={trandingMovies} />
          </AppSection>

          <AppSection>
            <AppSectionHeader title="trending TV shows" />
            <AppCarousel items={trandingShows} />
          </AppSection>
        </main>
      </div>

      <AppDialog isOpened={isSearchFormOpen} onClose={closeSearchDialog}>
        <SearchForm />
      </AppDialog>
    </>
  )
}
