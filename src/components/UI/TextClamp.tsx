import { CSSProperties, useEffect, useRef, useState } from 'react'

type Props = {
  text: string
  lines?: number
}

// TODO: need to deal with cases when window is resized
// ResizeObserver observe window?
const TextClamp: React.FC<Props> = ({ text, lines = 4 }) => {
  const textStyles: CSSProperties = {
    WebkitLineClamp: lines,
  }

  const textRef = useRef<HTMLParagraphElement>(null)

  const isTextClamped = () => {
    if (!textRef.current) return false
    else return textRef.current.scrollHeight > textRef.current.clientHeight
  }

  const [isClamped, setIsClamped] = useState(isTextClamped())
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setShowButton(isTextClamped())
      const resizeObserver = new ResizeObserver(() => {
        setIsClamped(isTextClamped())
      })

      resizeObserver.observe(textRef.current)
      return () => resizeObserver.disconnect() // clean
    }
  }, [])

  const handleTruncating = () => {
    textRef.current?.classList.toggle('truncate')
  }

  return (
    <>
      <p ref={textRef} className="truncate" style={textStyles}>
        {text}
      </p>
      {showButton && (
        <button className="button m-outline m-sm" onClick={handleTruncating}>
          {isClamped ? '...⤵' : '...⤴'}
        </button>
      )}
    </>
  )
}

export default TextClamp
