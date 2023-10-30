import FavoritesLink from './Favorites/FavoritesLink'
import QuickSearchOpenBtn from './QuickSearch/QuickSearchOpenBtn'
import Logo from './UI/Logo'

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner container">
        <Logo />
        <nav className="app-header__nav">
          <QuickSearchOpenBtn />
          <FavoritesLink />
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
