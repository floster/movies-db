interface Props {
  message: string
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <p className="message m-info align-self-center">
      <span className="message__icon">ℹ</span> {message}
    </p>
  )
}

export default Message
