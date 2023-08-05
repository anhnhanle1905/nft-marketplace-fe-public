import { ReactNode } from 'react'
import { Footer, Header, SEOHead } from '@/components'

import { Loader } from './Loader'
import WalletConnectProvider from '@/onchains/providers/wallet-connect-provider'
import { useUserWithoutLogin } from '@/hooks/useUserWithoutLogin'

interface FullLayoutProps {
    children: ReactNode
    transparentHeader?: boolean
}

export function FullLayoutWithoutLogin({ children, transparentHeader = false }: FullLayoutProps) {
    const { user, loading } = useUserWithoutLogin()

    return (
        <>
            {loading || !user ? (
                <Loader />
            ) : (
                <WalletConnectProvider>
                    <SEOHead />
                    <main
                        style={{
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyItems: 'flex-start',
                        }}
                    >
                        <Header user={user} transparentHeader={transparentHeader} />
                        {children}
                        <Footer sx={{ bgcolor: '#242059' }} />
                    </main>
                </WalletConnectProvider>
            )}
        </>
    )
}
