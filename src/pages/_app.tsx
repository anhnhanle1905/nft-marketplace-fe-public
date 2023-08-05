import axiosClient from '@/apis/axios-client'
import { theme } from '@/configs'
import createEmotionCache from '@/configs/createEmotionCache'
import { dappConfig } from '@/configs/dapp'
import { AuthProvider } from '@/contexts/AuthContext'
import WalletConnectProvider from '@/onchains/providers/wallet-connect-provider'
import '@/styles/globals.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DAppProvider } from '@usedapp/core'
import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { SWRConfig } from 'swr'

type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: false,
        },
    },
})

export default function App(props: ExtendedAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    return (
        <CacheProvider value={emotionCache}>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <QueryClientProvider client={queryClient}>
                        <SWRConfig
                            value={{
                                fetcher: (url) => axiosClient.get(url),
                                shouldRetryOnError: false,
                            }}
                        >
                            <DAppProvider config={dappConfig}>
                                <WalletConnectProvider>
                                    <Component {...pageProps} />
                                </WalletConnectProvider>
                            </DAppProvider>

                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                style={{ fontSize: '14px' }}
                            />
                        </SWRConfig>
                    </QueryClientProvider>
                </ThemeProvider>
            </AuthProvider>
        </CacheProvider>
    )
}
