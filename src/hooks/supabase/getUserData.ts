const PROFILES_TABLE = import.meta.env.VITE_SB_PROFILES_TABLE

import useGetSession from './getSession'
import { useAppActions } from '../useRedux'
import { useEffect } from 'react'
import { supabase } from '../../supabase/client'
import { INITIAL_FAVORITES_STATE } from '../../config'

import { PostgrestSingleResponse } from '@supabase/postgrest-js'
import { IRawSupabaseProfile } from '../../types/supabase.models'

const useGetUserData = () => {
  const { setAuthorized, setGod, setAccount, setInitialFavorites } =
    useAppActions()
  const { user, error } = useGetSession()

  useEffect(() => {
    setAuthorized(!!user)
    if (!error && user) {
      setAccount(user)

      supabase
        .from(PROFILES_TABLE as string)
        .select('*')
        .then(
          ({ data, error }: PostgrestSingleResponse<IRawSupabaseProfile[]>) => {
            if (error) {
              console.error(error)
              return
            }

            setGod(data[0].god_mode)

            const _fetchedFavorites =
              data && data[0] && data[0].favorites
                ? JSON.parse(data[0].favorites)
                : data && data[1] && data[1].favorites
                ? JSON.parse(data[1].favorites)
                : INITIAL_FAVORITES_STATE

            setInitialFavorites(_fetchedFavorites)
          }
        )
    }
  }, [user])
}

export default useGetUserData
