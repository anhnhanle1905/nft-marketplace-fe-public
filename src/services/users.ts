import { userApi } from '@/apis/user'
import { RequestImportWalletProps, Response, ResponseLogin, UpdatePasswordForm } from '@/types'
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useQueryWithCache } from './common'

const user_keys = {
    all: () => ['user_services'] as const,
    useGetUserByAddressOwner: (address?: string) =>
        [user_keys.all(), 'getUserByAddressOwner', address] as const,
}

export const useImportWallet = (
    config?: UseMutationOptions<
        Response<any>,
        AxiosError<any>,
        { userId: string; walletAddress: string; signature: string }
    >
) => {
    return useMutation(
        ({ userId, walletAddress, signature }: RequestImportWalletProps) =>
            userApi.importWallet({ userId, walletAddress, signature }),
        {
            onSuccess: (data, variables, context) => {
                toast.success('Register successful')
                //@ts-ignore
                config?.onSuccess?.(data, variables, context)
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || err.message)
            },
        }
    )
}

export const useGetUserByAddressOwner = (address: string) => {
    const { data, ...others } = useQueryWithCache(user_keys.useGetUserByAddressOwner(address), () =>
        address ? userApi.getUserByAddressOwner(address) : {}
    )

    return {
        /**@ts-ignore */
        userInfo: data?.data || { firstName: '', lastName: '-' },
        ...others,
    }
}

export const useUpdatePassword = (
    config?: UseMutationOptions<Response<ResponseLogin>, AxiosError<any>, unknown, unknown>
): UseMutationResult<Response<ResponseLogin>, AxiosError<any>, any, unknown> => {
    return useMutation((payload: UpdatePasswordForm) => userApi.changePassword(payload), {
        onSuccess: (data, variables, context) => {
            config?.onSuccess?.(data, variables, context)
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message)
        },
    })
}
