import useKeyboardShortcut from '../../hooks/useKeyboardShortcut'
import { useAppActions } from '../../hooks/useRedux'

import SvgIcon from './SvgIcon'

const OpenSerachBtn: React.FC = () => {
  const { openDialog } = useAppActions()

  useKeyboardShortcut(() => openDialog(), { code: 'KeyK', metaKey: true })

  return (
    <button
      className="app-button m-icon m-secondary open-search"
      aria-label="open search dialog"
      onClick={() => openDialog()}>
      <SvgIcon icon="search" />
    </button>
  )
}
export default OpenSerachBtn
