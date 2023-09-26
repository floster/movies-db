import SvgIcon from "./SvgIcon";
import ChangeLocale from "./ChangeLocale";
import { useSearchDialog } from "../contexts/SearchDialogContext";
import useKeyboardShortcut from "../hooks/useKeyboardShortcut";
import { useFavoritesState } from "../hooks/useFavoritesState";

export default function AppHeader() {
  const { show } = useSearchDialog();

  const { getFavoritesQty } = useFavoritesState();

  useKeyboardShortcut(() => show(), { code: "KeyK", metaKey: true });

  return (
    <header className="app-header">
      <div className="app-header__inner container">
        <a
          className="app-header__logo flex"
          href="/"
          aria-label="go to homepage"
        >
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
            onClick={show}
          >
            <SvgIcon icon="search" />
          </button>
          <a
            className="app-button m-open-favorites has-items m-icon m-primary"
            href="/favorites"
            aria-label="go to favorites"
            data-favorites-count={getFavoritesQty()}
          >
            <SvgIcon icon="fire" />
          </a>
        </nav>
      </div>
    </header>
  );
}
