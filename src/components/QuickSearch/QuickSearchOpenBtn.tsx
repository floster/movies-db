import useKeyboardShortcut from '../../hooks/useKeyboardShortcut'
import { useAppActions } from '../../hooks/useRedux'
import SvgIcon from '../UI/SvgIcon'

// import SvgIcon from './SvgIcon'

const OpenSerachBtn: React.FC = () => {
  const { openDialog } = useAppActions()

  useKeyboardShortcut(() => openDialog(), {
    code: 'KeyK',
    metaKey: true,
    shiftKey: true,
  })

  // TODO: recognize if currently on search form and set focus on search input instead of opening dialog

  return (
    <button
      type="button"
      onClick={() => openDialog()}
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
