import { supabase } from '../../supabase/client'

import { ISupabaseUserMeta } from '../../types/supabase.models'
import UserIcon from '../Header/UserIcon'

type Props = {
  session: ISupabaseUserMeta
}

const Profile: React.FC<Props> = ({ session }) => {
  return (
    <div className="profile">
      <header className="profile__header">
        <UserIcon /> {session.username}
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
