import SvgIcon from './SvgIcon'

type Props = {
  isSmall?: boolean
}

const NoImage: React.FC<Props> = ({ isSmall }) => {
  return (
    <div className={`no-image ${isSmall && 'm-small'}`}>
      <SvgIcon icon="broken" />
    </div>
  )
}

export default NoImage
