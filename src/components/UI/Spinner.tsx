interface Props {
  visible?: boolean
}

const Spinner: React.FC<Props> = ({ visible = true }) => (
  <span className={`app-loader ${visible && 'is-visible'}`}></span>
)

export default Spinner
