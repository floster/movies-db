import useGetSession from './getSession'
import { useAppActions } from '../useRedux'
import { useEffect } from 'react'

const useGetUserData = () => {
  const { setAuthorized, setAccount } = useAppActions()
  const { user, error } = useGetSession()

  useEffect(() => {
    setAuthorized(!!user)
    if (!error && user) setAccount(user)
  }, [user])
}

export default useGetUserData
