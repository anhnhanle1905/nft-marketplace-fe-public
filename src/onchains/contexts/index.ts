import { WalletConnectState } from '@/types/on-chain'
import { createContext } from 'react'

export const WalletConnectContext = createContext<WalletConnectState>({
    loading: false,
    active: false,
    account: null,
    ensAddress: null,
    library: undefined,
    error: null,
    deactivate: () => {},
    activateProvider: () => {},
    activateBrowserWallet: () => {},
    switchNetwork: (chainId: number) => {},
})
