interface Props {
  visible: boolean
}

export default function AppSpinner({ visible }: Props) {
  return <span className={`app-loader ${visible && 'is-visible'}`}></span>
}
