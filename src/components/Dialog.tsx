import { useEffect, useRef } from 'react'
import { useAppActions, useAppSelector } from '../hooks/useRedux'

interface Props {
  children: React.ReactNode
}

const Dialog: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDialogElement>(null)

  const { isOpen } = useAppSelector(state => state.dialog)
  const { closeDialog } = useAppActions()

  const dialogOnClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const target = e.target as HTMLElement
    if (target.nodeName === 'DIALOG') {
      closeDialog()
    }
  }

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal()
      document.body.classList.add('modal-open') // prevent bg scroll
    } else {
      ref.current?.close()
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  return (
    <dialog
      className="app-dialog search-dialog"
      ref={ref}
      onClick={dialogOnClick}
      onClose={() => closeDialog()}>
      {children}
    </dialog>
  )
}

export default Dialog
