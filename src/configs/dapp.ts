import { Config, Goerli } from '@usedapp/core'
import { providers } from 'ethers'

export const dappConfig: Config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: new providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli'),
    },
    // networks: [BaseTestnet],
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000,
    },
    autoConnect: true,
}
