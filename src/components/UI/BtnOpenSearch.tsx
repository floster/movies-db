import useKeyboardShortcut from '../../hooks/useKeyboardShortcut'
import { useAppActions } from '../../hooks/useRedux'
import SvgIcon from './SvgIcon'

// import SvgIcon from './SvgIcon'

const OpenSerachBtn: React.FC = () => {
  const { openDialog } = useAppActions()

  useKeyboardShortcut(() => openDialog(), { code: 'KeyK', metaKey: true })

  return (
    <button
      type="button"
      onClick={() => openDialog()}
      className="btn-open_search">
      <SvgIcon icon="search" />
      <span className="btn-open_search__label">search...</span>
      <kbd className="btn-open_search__kbd">
        <abbr title="Command">⌘</abbr> K
      </kbd>
    </button>
  )
}
export default OpenSerachBtn
