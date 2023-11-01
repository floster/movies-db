interface Props {
  error: string
}

const Error: React.FC<Props> = ({ error }) => {
  return <span className="app-error">⚠️ {error}</span>
}

export default Error
