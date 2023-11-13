import { useState } from 'react'

const useMatchMedia = () => {
  const mql = window.matchMedia('(min-width: 744px)')

  const [isDesktop, setIsDesktop] = useState(mql.matches)
  const [isMobile, setIsMobile] = useState(!mql.matches)

  mql.addEventListener('change', e => {
    if (e.matches) {
      setIsMobile(false)
      setIsDesktop(true)
    } else {
      setIsMobile(true)
      setIsDesktop(false)
    }
  })

  return { isDesktop, isMobile }
}

export default useMatchMedia
