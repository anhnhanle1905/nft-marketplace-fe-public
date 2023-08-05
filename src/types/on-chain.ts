import { JsonRpcProvider } from '@ethersproject/providers'

export type WalletConnectState = {
    loading: boolean
    active: boolean
    account: string | null
    ensAddress: string | null
    library: JsonRpcProvider | undefined
    error: string | null
    deactivate: () => void
    activateProvider: () => void
    activateBrowserWallet: () => void
    switchNetwork: (chainId: number) => void
}

export type Coin = {
    address: string
    decimals: number
    symbol: string
}
