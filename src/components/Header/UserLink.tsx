import Avvvatars from 'avvvatars-react'

import SvgIcon from '../UI/SvgIcon'
import { Link } from 'react-router-dom'

const UserLink: React.FC = () => (
  <Link to="user">
    {true ? (
      <Avvvatars
        value="valera.osadchuk@gmail.com"
        displayValue="MF"
        shadow={true}
      />
    ) : (
      <span
        className="button m-icon m-account"
        aria-label="go to authorization">
        <SvgIcon icon="ghost" />
      </span>
    )}
  </Link>
)

export default UserLink
