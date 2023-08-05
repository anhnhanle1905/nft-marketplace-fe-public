import { useRouter } from 'next/router'

import { authApis } from '@/apis/auth'
import {
    ForgotPasswordForm,
    LoginForm,
    Response,
    ResponseForgotPassword,
    ResponseLogin,
    ResponseSignUp,
    SignUpForm,
} from '@/types'
import {
    UseMutationOptions,
    UseMutationResult,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { auth_configs } from '@/configs/auth'
import { useN2ArenaStore } from '@/store/n2Arena_store'

const au_keys = {
    all: () => ['au_services'] as const,
    whoAmI: () => [...au_keys.all(), 'who_am_i'] as const,
    questions: () => ['questions'] as const,
}

export const useLogin = (
    config?: UseMutationOptions<Response<ResponseLogin>, AxiosError<any>, unknown, unknown>
): UseMutationResult<Response<ResponseLogin>, AxiosError<any>, any, unknown> => {
    const router = useRouter()

    return useMutation((payload: LoginForm) => authApis.login(payload), {
        onSuccess: (data, variables, context) => {
            // toast.success('Login successful')
            config?.onSuccess?.(data, variables, context)
        },
        onError: (err, variables) => {
            if (err?.response?.data?.message === 'User not verifed!') {
                return
            }
            toast.error(err?.response?.data?.message || err.message)
        },
    })
}

export const useQueryUser = (shouldFetch = true) => {
    const { storeUser } = useN2ArenaStore()

    return useQuery({
        queryKey: au_keys.whoAmI(),
        queryFn: () => (!shouldFetch ? null : authApis.who_am_i()),
        onSuccess: (data: any) => {
            if (data?.data) storeUser(data?.data)
        },
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return () => {
        queryClient.clear()
        localStorage.removeItem(auth_configs.storageTokenKeyName)
        router.push('/login')
    }
}

export const useSignUp = (
    config?: UseMutationOptions<Response<ResponseSignUp>, AxiosError<any>, unknown, unknown>
) => {
    return useMutation((payload: SignUpForm) => authApis.sign_up(payload), {
        onSuccess: (data, variables, context) => {
            toast.success('Register successful')
            //@ts-ignore
            config?.onSuccess?.(data, variables, context)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || err.message)
        },
    })
}

export const useForgotPassword = (
    config?: UseMutationOptions<ResponseForgotPassword, AxiosError<any>, unknown, unknown>
): UseMutationResult<ResponseForgotPassword, AxiosError<any>, any, unknown> => {
    return useMutation((payload: ForgotPasswordForm) => authApis.forgot_password(payload), {
        onSuccess: (data, variables, context) => {
            toast.success('Sent email successfully')
            config?.onSuccess?.(data, variables, context)
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message)
        },
    })
}
