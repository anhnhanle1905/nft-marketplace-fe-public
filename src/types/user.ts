export interface User {
    _id: string
    listNFT: any[]
    name: string
    firstName: string
    lastName: string
    wishList: any[]
    walletList: string[]
    uniqueEmailId: number
    email: string
    isVerified: boolean
    nextFreeMint: string
    isFinishedKYC: boolean
}

export interface ResponseLogin {
    payload: User
    token: string
}

export interface ResponseSignUp {
    id: string
    email: string
}

export interface ResponseForgotPassword {
    messages: string
    statusCode: number
}

export interface ResponseResetPassword {
    messages: string
    statusCode: number
}
