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
  const [isClamped, setIsClamped] = useState(
    textRef.current?.scrollHeight! > textRef.current?.clientHeight!
  )
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setShowButton(
        textRef.current?.scrollHeight! > textRef.current?.clientHeight!
      )
      const resizeObserver = new ResizeObserver(() => {
        setIsClamped(
          textRef.current?.scrollHeight! > textRef.current?.clientHeight!
        )
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
