interface Props {
  visible?: boolean
  relative?: boolean
}

const Spinner: React.FC<Props> = ({ visible = true, relative = false }) => (
  <span
    className={`app-spinner ${visible && 'is-visible'} ${
      relative && 'm-relative'
    }`}></span>
)

export default Spinner
