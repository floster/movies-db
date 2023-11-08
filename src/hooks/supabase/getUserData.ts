const PROFILES_TABLE = import.meta.env.VITE_SB_PROFILES_TABLE
const FAVS_COLUMN = import.meta.env.VITE_SB_FAVS_COLUMN

import useGetSession from './getSession'
import { useAppActions } from '../useRedux'
import { useEffect } from 'react'
import { supabase } from '../../supabase/client'

const useGetUserData = () => {
  const { setAuthorized, setAccount, setInitialFavorites } = useAppActions()
  const { user, error } = useGetSession()

  useEffect(() => {
    setAuthorized(!!user)
    if (!error && user) {
      setAccount(user)

      supabase
        .from(PROFILES_TABLE as string)
        .select(FAVS_COLUMN)
        .then(({ data, error }) => {
          if (error) {
            console.error(error)
            return
          }

          const _fetchedFavorites = JSON.parse(
            data[0][FAVS_COLUMN] ?? data[1][FAVS_COLUMN]
          )

          setInitialFavorites(_fetchedFavorites)
        })
    }
  }, [user])
}

export default useGetUserData
