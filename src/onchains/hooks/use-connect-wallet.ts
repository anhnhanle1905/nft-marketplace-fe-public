import { useEthers } from '@usedapp/core'
import React from 'react'
import { currentNetwork } from '../constants'

export const useWalletConnect = () => {
    const ethers = useEthers()
    const { chainId, account, deactivate, activateBrowserWallet, switchNetwork } = ethers

    React.useEffect(() => {
        if (account && chainId) {
            if (chainId !== currentNetwork.chainId) {
                switchNetwork(currentNetwork.chainId)
                    .then(() => {
                        setTimeout(() => {
                            activateBrowserWallet()
                        }, 500)
                    })
                    .catch((err) => {
                        // User rejected the request.
                        if (err?.code === 4001) {
                            deactivate()
                        }
                    })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, chainId])

    return ethers
}
