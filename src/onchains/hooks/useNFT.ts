import { useCall } from '@usedapp/core'
import { nftContract, nft_contract, natTokenContract } from '../constants'
import { useContractFunction } from './useContractFunction'
import { toast } from 'react-toastify'

export const useCheckApprovalNFT = (tokenId: number) => {
    const { value, error } =
        useCall({
            contract: nftContract,
            method: 'getApproved',
            args: [tokenId],
        }) ?? {}
    if (error) {
        console.error(error.message)
        return undefined
    }
    let resultCheckApprovalNFT = value ? value?.[0] : ''
    return resultCheckApprovalNFT
}

export const useCheckOwnerOfNFT = (tokenId: number) => {
    const { value, error } =
        useCall({
            contract: nftContract,
            method: 'ownerOf',
            args: [tokenId],
        }) ?? {}
    if (error) {
        console.error(error.message)
        return undefined
    }
    let resultCheckApprovalNFT = value ? value?.[0] : ''

    return resultCheckApprovalNFT
}

export const useMintFromUser = () => {
    const { mining, send } = useContractFunction({
        args: [nftContract, 'mintFromUser'],
        onSuccess() {
            toast.success('Successfully Mint NFT. Please confirm your transaction now.')
        },
        onError() {
            toast.error('Mint NFT transaction failed')
        },
    })

    const mintFromUser = async (toAddress: string) => {
        try {
            const tx = await send(toAddress)
            return tx
        } catch (error) {
            console.log(error)
        }
    }

    return { mining, mintFromUser }
}
