export interface HomeForm {
    email: string
}
export interface SignUpForm {
    email: string
    firstName: string
    lastName: string
    password: string
}

export interface LoginForm {
    email: string
    password: string
}

export interface VerifyEmailForm {
    email: string
    code: string
}

export interface ForgotPasswordForm {
    email: string
}

export interface ResetPasswordForm {
    password: string
    token: string
}

export interface UpdateNameForm {
    firstName: string
    lastName: string
}

export interface UpdatePasswordForm {
    password: string
    newPassword: string
}

export interface UpdateAddressForm {
    address: string
    addressCont?: string
    city: string
    state: string
    zipCode: string
}

export interface ResetPasswordForm {
    password: string
}
