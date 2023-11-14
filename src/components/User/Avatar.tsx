import SvgIcon from '../UI/SvgIcon'

type Props = {
  picture?: string
  icon?: boolean
}

const Avatar = ({ picture, icon }: Props) => {
  return (
    <picture className={`avatar ${icon && 'm-icon'}`}>
      {icon ? (
        <SvgIcon icon="logged_in" />
      ) : (
        <img src={picture} alt="user avatar" />
      )}
    </picture>
  )
}

export default Avatar
