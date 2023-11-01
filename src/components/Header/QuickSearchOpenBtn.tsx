import useKeyboardShortcut from '../../hooks/useKeyboardShortcut'
import { useAppActions } from '../../hooks/useRedux'
import SvgIcon from '../UI/SvgIcon'

// import SvgIcon from './SvgIcon'

const OpenSerachBtn: React.FC = () => {
  const { openDialog } = useAppActions()

  useKeyboardShortcut(() => handleOpenQuickSearch(), {
    code: 'KeyK',
    metaKey: true,
    shiftKey: true,
  })

  const handleOpenQuickSearch = () => {
    if (document.location.pathname === '/search') {
      const searchInput = document.getElementById('mainSearchInput')
      if (searchInput) {
        searchInput.focus()
      } else {
        openDialog()
      }
    } else {
      openDialog()
    }
  }

  return (
    <button
      type="button"
      onClick={() => handleOpenQuickSearch()}
      className="quick-search-open-btn">
      <SvgIcon icon="search" />
      <span className="quick-search-open-btn__label">search...</span>
      <kbd className="quick-search-open-btn__kbd">
        <abbr title="Shift">⇧</abbr>
        <abbr title="Command">⌘</abbr> K
      </kbd>
    </button>
  )
}
export default OpenSerachBtn
