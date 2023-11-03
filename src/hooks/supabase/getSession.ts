import { useEffect, useState } from 'react'
import { AuthError, Session } from '@supabase/supabase-js'

import { supabase } from '../../supabase/client'

/**
 * Custom React hook for getting the current session from Supabase.
 *
 * @returns {Object} An object containing the current session and any authentication error.
 * @property {Session|null} session - The current session, or null if no session is active.
 * @property {AuthError|null} error - Any authentication error that occurred while getting the session, or null if no error occurred.
 */
const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setSession(session)
      setError(error)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return { session, error }
}

export default useGetSession
