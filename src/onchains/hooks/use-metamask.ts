'use client'

import { useAuth } from '@/utils'
import { USER_WALLET_ADDRESS } from '@/utils/constants'
import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import React from 'react'

import { currentNetwork } from '../constants'

const isUnlocked = async () => {
    // @ts-ignore
    if (typeof window.ethereum === 'undefined') return false
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    try {
        const accounts = await provider.listAccounts()
        return accounts.length > 0
    } catch (e) {
        return false
    }
}

export const useInjectMetamask = () => {
    const [address, setAddress] = React.useState<string | any>('')

    const { activateBrowserWallet } = useEthers()
    if (typeof window !== 'undefined') {
        // Client-side-only code
        setAddress(localStorage.getItem(USER_WALLET_ADDRESS))
    }

    const isAuth = useAuth()

    React.useEffect(() => {
        ;(async () => {
            // @ts-ignore
            if (isAuth && window.ethereum && address && (await isUnlocked())) {
                activateBrowserWallet()
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useConnectMetamask = () => {
    const { activateBrowserWallet, switchNetwork, account, chainId } = useEthers()

    React.useEffect(() => {
        if (account) {
            localStorage.setItem(USER_WALLET_ADDRESS, account)
            if (chainId !== currentNetwork.chainId) {
                switchNetwork(currentNetwork.chainId)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

    return () => {
        activateBrowserWallet()
    }
}
