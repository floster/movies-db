import SvgIcon from './UI/SvgIcon'
import ChangeLocale from './UI/ChangeLocale'
import useKeyboardShortcut from '../hooks/useKeyboardShortcut'
import FavoritesLink from './Favorites/FavoritesLink'
import { useAppActions } from '../hooks/useRedux'

export default function AppHeader() {
  const { openDialog } = useAppActions()

  useKeyboardShortcut(() => openDialog(), { code: 'KeyK', metaKey: true })

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
          <div className="app-header__locale">
            <ChangeLocale />
          </div>
          <button
            className="app-button m-icon m-secondary open-search"
            aria-label="open search dialog"
            onClick={() => openDialog()}>
            <SvgIcon icon="search" />
          </button>
          <FavoritesLink />
        </nav>
      </div>
    </header>
  )
}
