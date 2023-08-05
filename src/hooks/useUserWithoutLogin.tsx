import { useEffect } from 'react'
// services
import { useQueryUser, useLogout } from '@/services/auth'
// store
import { useN2ArenaStore } from '@/store/n2Arena_store'
// store

export const useUserWithoutLogin = () => {
    const logout = useLogout()
    const { me } = useN2ArenaStore()
    const hasMe = me?.email

    const { data, error, isLoading, ...others } = useQueryUser(!hasMe)

    const user = hasMe
        ? me
        : data
        ? data?.data
        : {
              _id: 'default321@!$',
              listNFT: [],
              name: '',
              firstName: '',
              lastName: '',
              wishList: [],
              walletList: [],
              uniqueEmailId: 0,
              email: '',
              isVerified: false,
          }
    const loading = hasMe ? false : isLoading

    useEffect(() => {
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!user && !error) return

        if (error) {
            console.log('error: ', error)
            // logout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error])

    return { user, loading, ...others }
}
