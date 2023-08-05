import { auth_configs } from '@/configs/auth'
import { AuthValuesType, User } from '@/types'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const defaultProvider: AuthValuesType = {
    loading: true,
    user: null,
    storeUser: () => {},
    logout: () => Promise.resolve(),
}

const AuthContext = React.createContext<AuthValuesType>(defaultProvider)

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = React.useState<User | null>(defaultProvider.user)
    const [loading, setLoading] = React.useState<boolean>(defaultProvider.loading)

    const router = useRouter()

    React.useEffect(() => {
        const initAuth = async (): Promise<void> => {
            const storedToken = window.localStorage.getItem(auth_configs.storageTokenKeyName)!
            if (storedToken) {
                setLoading(true)
                // Call api get me here
                // await axios
                //     .get(authConfig.meEndpoint, {
                //         headers: {
                //             Authorization: storedToken,
                //         },
                //     })
                //     .then(async (response) => {
                //         setLoading(false)
                //         setUser({ ...response.data.userData })
                //     })
                //     .catch(() => {
                //         localStorage.removeItem('userData')
                //         localStorage.removeItem('refreshToken')
                //         localStorage.removeItem('accessToken')
                //         setUser(null)
                //         setLoading(false)
                //         if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                //             router.replace('/login')
                //         }
                //     })
            } else {
                setLoading(false)
            }
        }

        initAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const storeUser = React.useCallback((user: User, token: string) => {
        if (user) {
            window.localStorage.setItem(auth_configs.storageTokenKeyName, token)
            const returnUrl = router.query.returnUrl

            setUser(user)
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

            router.replace(redirectURL as string)
        }
    }, [])

    const handleLogout = React.useCallback(() => {
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(auth_configs.storageTokenKeyName)
        router.push('/login')
    }, [])

    const values = {
        user,
        loading,
        storeUser,
        logout: handleLogout,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
