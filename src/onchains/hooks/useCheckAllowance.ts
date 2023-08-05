import { useCall } from '@usedapp/core'
import { marketplace_contract, natTokenContract } from '../constants'

export const useCheckAllowance = (account: string | undefined) => {
    const { value, error } =
        useCall(
            account && {
                contract: natTokenContract,
                method: 'allowance',
                args: [account, marketplace_contract],
            }
        ) ?? {}
    if (error) {
        console.error(error.message)
        return undefined
    }
    return value?.[0]
}
