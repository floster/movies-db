import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

import { Session } from '@supabase/gotrue-js/src/lib/types'

import Auth from '../components/User/Auth'
import Account from '../components/User/Account'
import { useDocumentTitle } from 'usehooks-ts'

function User() {
  const [session, setSession] = useState<Session>()

  useDocumentTitle(`${session ? 'Profile' : 'Login'} - Movies DB`)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as Session)
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
