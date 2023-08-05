import { useEffect, useState } from 'react'
import { useContractFunction as useContractFunctionUseDapp } from '@usedapp/core'
import { toast } from 'react-toastify'

export function useContractFunction({ args = [], onSuccess, onError }: any) {
    // @ts-ignore
    const { send, state } = useContractFunctionUseDapp.apply(this, args)
    const [mining, setMining] = useState<boolean>(false)

    useEffect(() => {
        //handle transaction
        // console.log(state.transaction?.hash)

        switch (state?.status) {
            case 'Exception':
                if (state?.errorMessage === 'user rejected transaction') {
                    toast.warn('Transaction rejected')
                }
                setMining(false)
                break
            case 'PendingSignature':
            case 'Mining':
                setMining(true)
                break
            case 'Success':
                setMining(false)
                if (onSuccess) onSuccess()
                break
            default:
                if (state?.status !== 'None') {
                    setMining(false)
                    if (onError) onError()
                }
                break
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return { send, mining }
}
