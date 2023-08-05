import { ReactNode } from 'react'
import { Footer, Header, SEOHead } from '@/components'
import { useUser } from '@/hooks/useUser'
import { Loader } from './Loader'
import WalletConnectProvider from '@/onchains/providers/wallet-connect-provider'

interface FullLayoutProps {
    children: ReactNode
    transparentHeader?: boolean
}

export function FullLayout({ children, transparentHeader = false }: FullLayoutProps) {
    const { user, loading } = useUser()

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
