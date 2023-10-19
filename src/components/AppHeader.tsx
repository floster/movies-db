import { useAppActions } from '../hooks/useRedux'
import useKeyboardShortcut from '../hooks/useKeyboardShortcut'

import SvgIcon from './UI/SvgIcon'
import FavoritesLink from './Favorites/FavoritesLink'
import OpenSerachBtn from './UI/OpenSearchBtn'

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner container">
        <a
          className="app-header__logo flex"
          href="/"
          aria-label="go to homepage">
          <SvgIcon
            icon="logo_light"
            extraClass="app-header__logo-svg"
            logo={true}
          />
        </a>
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
