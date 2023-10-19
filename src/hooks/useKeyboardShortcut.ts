import { useEffect, useCallback } from 'react'

type OptionalConfig = Pick<
  KeyboardEvent,
  'altKey' | 'ctrlKey' | 'shiftKey' | 'metaKey'
>

interface ShortcutConfig extends Partial<OptionalConfig> {
  code: KeyboardEvent['code']
  shortcutTarget?: HTMLElement
}

type ShortcutAction = (e: KeyboardEvent) => void

export default function useKeyboardShortcut(
  shortcutAction: ShortcutAction,
  config: ShortcutConfig
) {
  const targetElement = config.shortcutTarget || document

  const eventHandler = useCallback(
    (e: KeyboardEvent) => {
      const { code, ctrlKey, altKey, shiftKey, metaKey } = e
      if (config.code !== code) return
      if (config.ctrlKey && !ctrlKey) return
      if (config.shiftKey && !shiftKey) return
      if (config.altKey && !altKey) return
      if (config.metaKey && !metaKey) return

      shortcutAction(e)
    },
    [shortcutAction, config]
  )

  useEffect(() => {
    targetElement.addEventListener('keydown', { handleEvent: eventHandler })
    return () =>
      targetElement.removeEventListener('keydown', {
        handleEvent: eventHandler,
      })
  }, [targetElement, eventHandler])
}
