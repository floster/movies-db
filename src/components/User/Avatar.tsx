type Props = {
  picture: string
}

const Avatar = ({ picture }: Props) => {
  return (
    <picture className="avatar">
      <img src={picture} alt="user avatar" />
    </picture>
  )
}

export default Avatar
