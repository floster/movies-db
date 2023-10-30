import Logo from './UI/Logo'

const AppFooter: React.FC = () => (
  <footer className="app-footer">
    <div className="container">
      <div className="app-footer__logos">
        <Logo />
        powered by{' '}
        <a
          className="tmdb-logo"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer">
          <img
            className="tmdb-logo__img"
            height={24}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie Database logo"
          />
        </a>
      </div>
    </div>
  </footer>
)

export default AppFooter
