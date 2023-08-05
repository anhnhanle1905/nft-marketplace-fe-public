import { toast } from 'react-toastify'
import { marketplaceContract } from '../constants'
import { useContractFunction } from './useContractFunction'

export const useAddOrder = () => {
    const { mining, send } = useContractFunction({
        args: [marketplaceContract, 'addOrder'],
        onSuccess() {
            toast.success('Successfully add order. Please confirm your transaction now.')
        },
        onError() {
            toast.error('Add order transaction failed')
        },
    })

    const addOrder = async (tokenId: number, paymentToken: string, price: any) => {
        try {
            const tx = await send(tokenId, paymentToken, price)
            return tx
        } catch (error) {
            console.log(error)
        }
    }

    return { mining, addOrder }
}

export const useCancelOrder = () => {
    const { mining, send } = useContractFunction({
        args: [marketplaceContract, 'cancelOrder'],
        onSuccess() {
            toast.success('Successfully cancel Order. Please confirm your transaction now.')
        },
        onError() {
            toast.error('cancel Order transaction failed')
        },
    })

    const cancelOrder = async (orderId: number) => {
        try {
            const tx = await send(orderId)
            return tx
        } catch (error) {
            console.log(error)
        }
    }

    return { mining, cancelOrder }
}

export const useExecuteOrder = () => {
    const { mining, send } = useContractFunction({
        args: [marketplaceContract, 'executeOrder'],
        onSuccess() {
            toast.success('Successfully Execute Order. Please confirm your transaction now.')
        },
        onError() {
            toast.error('Execute Order transaction failed')
        },
    })

    const executeOrder = async (orderId: number) => {
        try {
            const tx = await send(orderId)
            return tx
        } catch (error) {
            console.log(error)
        }
    }

    return { mining, executeOrder }
}
