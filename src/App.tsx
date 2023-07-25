import { useState } from 'react';
import './app.scss'
import AppHeader from './components/AppHeader';
import { AppSection } from './components/AppSection';
import { MainPageSidebar } from './components/MainPageSidebar';
import data from './data.json'
import AppSectionHeader from './components/AppSectionHeader';
import MediaHero from './components/MediaHero';
import AppCarousel from './components/AppCarousel';
import MovieCrew from './components/MovieCrew';
import AppTile from './components/AppTile';

function App() {
  const [movies] = useState(data.parts);
  const [heroRandom] = useState(data.hero.random);
  const [heroMovie] = useState(data.hero.movie);
  const [movieCrew] = useState(data.movie.crew);
  const [movieCast] = useState(data.movie.cast);
  const [trandingMovies] = useState(data.tranding_movies);
  const [trandingShows] = useState(data.tranding_shows);

  return (
    <>
      <AppHeader />
      {/* ================= Movie Page =================  */}
      <section className="movie-header">
        <MediaHero data={heroMovie} isRandom={false} />
        <AppSection extraClass="m-movie_crew">
          <div className="container">
            <MovieCrew members={movieCrew} />
            <AppSectionHeader title="crew" hasSelect={false} />
          </div>
        </AppSection>
        <div className="l-content container">
          <AppSection>
            <AppSectionHeader title="cast" hasSelect={false} />
            <div className="l-tiles_grid m-people">
              {movieCast.map((castMember) => <AppTile tile={castMember} type="actor" />)}
            </div>
          </AppSection>
        </div>
      </section>
      {/* ================= Main page =================  */}
      {/* 
      <div className="l-content m-main_page container">
        <MainPageSidebar movies={movies} />
        <main className="l-main_page_content">
          <AppSection extraClass="m-random_media">
            <AppSectionHeader title="random collection" hasSelect={false} />
            <MediaHero data={heroRandom} isRandom={true} />
          </AppSection>

          <AppSection>
            <AppSectionHeader title="trending movies" hasSelect={false} />
            <AppCarousel items={trandingMovies} />
          </AppSection>

          <AppSection>
            <AppSectionHeader title="trending TV shows" hasSelect={false} />
            <AppCarousel items={trandingShows} />
          </AppSection>
        </main>
      </div>
      */}
    </>
  )
}

export default App
