import {
    ForgotPasswordForm,
    LoginForm,
    Response,
    ResponseForgotPassword,
    ResponseLogin,
    ResponseSignUp,
    SignUpForm,
} from '@/types'
import axiosClient from './axios-client'

export const authApis = {
    login(data: LoginForm): Promise<Response<ResponseLogin>> {
        return axiosClient.post('user/login', data)
    },
    sign_up(data: SignUpForm): Promise<Response<ResponseSignUp>> {
        return axiosClient.post('user/register', data)
    },
    who_am_i(): Promise<Response<ResponseLogin>> {
        return axiosClient.get('user/getUser')
    },
    forgot_password(data: ForgotPasswordForm): Promise<ResponseForgotPassword> {
        console.log('test data forgot_password: ', data)
        return axiosClient.post('user/forgetPassword', data)
    },
}
