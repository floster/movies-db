import Avvvatars from 'avvvatars-react'

import SvgIcon from '../UI/SvgIcon'
import { useAppSelector } from '../../hooks/useRedux'
import Avatar from '../User/Avatar'

const UserIcon: React.FC = () => {
  const session = useAppSelector(state => state.account.account)
  const isAuthorized = useAppSelector(state => state.account.isAuthorized)

  if (!isAuthorized || !session)
    return (
      <span
        className="button m-icon m-account"
        aria-label="go to authorization">
        <SvgIcon icon="ghost" />
      </span>
    )

  const avatar = session.avatar_url || session.picture

  return avatar ? (
    <Avatar picture={avatar} />
  ) : (
    <Avvvatars value={session.username} shadow={true} />
  )
}

export default UserIcon
