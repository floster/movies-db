import { useState, useEffect } from 'react'
import { supabase } from '../../supabase/client'
import { Session } from '@supabase/gotrue-js/src/lib/types'

type Props = {
  session: Session
}

const Account: React.FC<Props> = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState('')

  console.log('session', session)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(
    event: React.FormEvent<HTMLFormElement>,
    avatar_url: string
  ) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      avatar_url,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatar_url)
    }
    setLoading(false)
  }

  return (
    <div className="account">
      <p>
        You're loged in as <strong>{username || session.user.email}</strong>
      </p>
      <small>Update your profile:</small>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          updateProfile(e, avatar_url)
        }
        className="auth__form app-form">
        <input
          className="app-input m-center"
          id="email"
          type="text"
          value={session.user.email}
          disabled
        />
        <input
          className="app-input m-center"
          id="username"
          type="text"
          required
          value={username ?? ''}
          onChange={e => setUsername(e.target.value)}
        />

        <footer className="app-form__footer">
          <button
            className="button m-block"
            type="button"
            onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
          <button
            className="button m-primary m-block"
            type="submit"
            disabled={loading}>
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </footer>
      </form>
    </div>
  )
}

export default Account
