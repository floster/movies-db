import FavoritesLink from './Header/FavoritesLink'
import QuickSearchOpenBtn from './Header/QuickSearchOpenBtn'
import SelectLocale from './UI/Select/SelectLocale'
import Logo from './UI/Logo'
import UserLink from './Header/UserLink'

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner container">
        <div className="app-header__logo">
          <Logo />
          <SelectLocale />
        </div>
        <nav className="app-header__nav">
          <QuickSearchOpenBtn />
          <FavoritesLink />
          <UserLink />
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
