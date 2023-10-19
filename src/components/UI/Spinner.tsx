interface Props {
  visible: boolean
}

const Spinner: React.FC<Props> = ({ visible }) => (
  <span className={`app-loader ${visible && 'is-visible'}`}></span>
)

export default Spinner
