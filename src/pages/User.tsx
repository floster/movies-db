import Auth from '../components/User/Auth'
import Profile from '../components/User/Profile'
import { useAppSelector } from '../hooks/useRedux'

function User() {
  const isAuthorized = useAppSelector(state => state.account.isAuthorized)
  const session = useAppSelector(state => state.account.session)

  return (
    <section className="container user">
      <header className="user__header">
        <h2 className="user__title">{session ? 'Profile' : 'Login'}</h2>
      </header>
      <div className="user__inner">
        {!isAuthorized || !session ? <Auth /> : <Profile session={session} />}
      </div>
    </section>
  )
}

export default User
