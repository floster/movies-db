import FavoritesLink from './Header/FavoritesLink'
import QuickSearchOpenBtn from './Header/QuickSearchOpenBtn'
import SelectLocale from './UI/Select/SelectLocale'
import Logo from './UI/Logo'
import UserIcon from './Header/UserIcon'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/useRedux'

const AppHeader: React.FC = () => {
  const isAuthorized = useAppSelector(state => state.account.isAuthorized)

  return (
    <header className="app-header">
      <div className="app-header__inner container">
        <div className="app-header__logo">
          <Logo />
          <SelectLocale />
        </div>
        <nav className="app-header__nav">
          <QuickSearchOpenBtn />
          {isAuthorized && <FavoritesLink />}
          <Link to="user">
            <UserIcon />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
