import { useEffect, useState } from 'react'
import { AuthError, Session } from '@supabase/supabase-js'

import { supabase } from '../../supabase/client'
import {
  IRawSupabaseUserMeta,
  ISupabaseAccountMeta,
} from '../../types/supabase.models'

const getUserName = (meta: IRawSupabaseUserMeta): string => {
  return (
    meta.preferred_username ||
    meta.user_name ||
    meta.full_name ||
    meta.email ||
    ''
  )
}

/**
 * Custom React hook for getting the current session from Supabase.
 *
 * @returns {Object} An object containing the current session and any authentication error.
 * @property {Session|null} session - The current session, or null if no session is active.
 * @property {AuthError|null} error - Any authentication error that occurred while getting the session, or null if no error occurred.
 */
const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<ISupabaseAccountMeta | null>(null)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('session', session)
      setSession(session)
      setError(error)

      if (session !== null) {
        const rawMeta = session.user.user_metadata as IRawSupabaseUserMeta
        const user: ISupabaseAccountMeta = {
          ...rawMeta,
          username: getUserName(rawMeta),
        }
        setUser(user)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { session, user, error }
}

export default useGetSession
