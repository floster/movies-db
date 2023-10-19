import FavoritesLink from './Favorites/FavoritesLink'
import OpenSerachBtn from './UI/OpenSearchBtn'
import Logo from './UI/Logo'

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner container">
        <Logo />
        <nav className="app-header__nav">
          {/* <ChangeLocale /> */}
          <OpenSerachBtn />
          <FavoritesLink />
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
