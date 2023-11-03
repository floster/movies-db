import { supabase } from '../../supabase/client'
import { Session } from '@supabase/gotrue-js/src/lib/types'

import Avvvatars from 'avvvatars-react'

type Props = {
  session: Session
}

const Profile: React.FC<Props> = ({ session }) => {
  return (
    <div className="profile">
      <header className="profile__header">
        <Avvvatars
          value="valera.osadchuk@gmail.com"
          displayValue="MF"
          shadow={true}
        />{' '}
        {session.user.email}
      </header>
      <form className="auth__form app-form">
        <footer className="app-form__footer">
          <button
            className="button m-block"
            type="button"
            onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </footer>
      </form>
    </div>
  )
}

export default Profile
