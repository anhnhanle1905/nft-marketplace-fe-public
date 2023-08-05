import { toast } from 'react-toastify'
import { marketplace_contract, nftContract } from '../constants'
import { useContractFunction } from './useContractFunction'

export const useApproveNFT = () => {
    const { mining, send } = useContractFunction({
        args: [nftContract, 'approve'],
        onSuccess() {
            toast.success('Successfully Approve NFT. Please confirm your transaction now.')
        },
        onError() {
            toast.error('Approve NFT transaction failed')
        },
    })

    const approveNFT = async (tokenId: number) => {
        try {
            const tx = await send(marketplace_contract, tokenId)
            return tx
        } catch (error) {
            console.log(error)
        }
    }

    return { mining, approveNFT }
}
