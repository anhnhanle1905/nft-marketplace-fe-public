import { PoolAddress } from '@/types/pool'
import { BigNumber, ethers, utils } from 'ethers'
import { find, isEmpty } from 'lodash'
import { toast } from 'react-toastify'

let provider: ethers.providers.Web3Provider | null = null
let signer: ethers.Signer | null = null

// export const signMessage = async ({ message }: { message: string }) => {
//     if (!(window as any).ethereum) {
//         throw new Error('No crypto wallet found. Please install it.')
//     }

//     if (!provider || !signer) {
//         await (window as any).ethereum.enable()
//         await (window as any).ethereum.send('eth_requestAccounts');
//         provider = new ethers.providers.Web3Provider((window as any).ethereum)
//         signer = provider.getSigner()
//     }

//     const [signature, address] = await Promise.all([
//         signer.signMessage(message),
//         signer.getAddress(),
//     ]).finally(() => {
//         if (!signature || !address) {
//             toast.error('Failed to sign message.')
//         }
//     })

//     return {
//         message,
//         signature,
//         address,
//     }
// }

export const signMessage = async ({ message }: { message: string }) => {
    try {
        if (!(window as any).ethereum) throw new Error('No crypto wallet found. Please install it.')

        await (window as any).ethereum.send('eth_requestAccounts')
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const signer = provider.getSigner()
        const signature = await signer.signMessage(message)
        const address = await signer.getAddress()

        return {
            message,
            signature,
            address,
        }
    } catch (err: any) {
        toast.error(err.message)
    }
}

export const getPools = (payload: any): PoolAddress[] | null => {
    if (payload.pool_address && Array.isArray(payload.pool_address)) {
        return payload.pool_address.map((pool: any) => pool)
    }
    return null
}

export const roundNumber = (
    number?: BigNumber | number,
    decimal?: number,
    decimalPlaces?: number
) => {
    // @ts-ignore
    if (!number || number._hex === '0x00') return 0
    const temp = typeof number === 'number' ? number : +utils.formatUnits(number, decimal || 18)
    const factor = Math.pow(10, decimalPlaces || 18)
    return Math.floor(temp * factor) / factor
}

export function formatAddress(wallet: string, length = 10) {
    if (wallet) {
        if (wallet.length > length * 2) {
            return wallet.slice(0, length) + '...' + wallet.slice(wallet.length - length)
        } else {
            return wallet
        }
    } else return null
}

export const checkExistsWallet = (wallets: string[], wallet: string | unknown | any) => {
    return !isEmpty(find(wallets, wallet))
}
