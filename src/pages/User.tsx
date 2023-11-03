import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

import { Session } from '@supabase/gotrue-js/src/lib/types'

import Auth from '../components/User/Auth'
import Profile from '../components/User/Profile'
import { useDocumentTitle } from 'usehooks-ts'

function User() {
  // TODO: store session status in store
  const [session, setSession] = useState<Session | null>()

  useDocumentTitle(`${session ? 'Profile' : 'Login'} - Movies DB`)

  useEffect(() => {
    supabase.auth
      // getting session data
      .getSession()
      // store session data in state
      .then(({ data: { session } }) => setSession(session))
      .catch(() => setSession(null))

    // receive a notification every time an auth event happens
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <section className="container user">
      <header className="user__header">
        <h2 className="user__title">{session ? 'Profile' : 'Login'}</h2>
      </header>
      <div className="user__inner">
        {!session ? (
          <Auth />
        ) : (
          <Profile key={session.user.id} session={session} />
        )}
      </div>
    </section>
  )
}

export default User
