import { useContractFunction } from '@usedapp/core'
import { nattoken_contract, natTokenContract } from '../constants'

export const useApproveToken = () => {
    const { state, send } = useContractFunction(natTokenContract, 'approve')

    const approve = async (amount: string) => {
        try {
            await send(nattoken_contract, amount)
        } catch (error) {
            console.log(error)
        }
    }

    return { state, approve }
}
