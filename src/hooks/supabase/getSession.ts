import { useEffect, useState } from 'react'
import { AuthError, Session } from '@supabase/supabase-js'

import { supabase } from '../../supabase/client'
import {
  IRawSupabaseUserMeta,
  ISupabaseUserMeta,
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
  const [meta, setMeta] = useState<ISupabaseUserMeta | null>(null)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setSession(session)
      setError(error)
    })

    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (error) throw error
        if (!data) return null

        const rawMeta = data.user.user_metadata as IRawSupabaseUserMeta

        const user: ISupabaseUserMeta = {
          ...rawMeta,
          username: getUserName(rawMeta),
        }
        setMeta(user)
      })
      .catch(error => {
        throw error
      })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return { session, meta, error }
}

export default useGetSession
