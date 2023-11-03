import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

import { Session } from '@supabase/gotrue-js/src/lib/types'

import Auth from '../components/User/Auth'
import Account from '../components/User/Account'
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
    <div className="container user">
      <div className="user__inner">
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
    </div>
  )
}

export default User
