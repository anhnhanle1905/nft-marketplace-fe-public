import { User } from './user'

export type AuthValuesType = {
    loading: boolean
    user: User | null
    storeUser: (user: User, token: string) => void
    logout: () => void
}

export type Subscriber = {
    _id: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export enum ROLE {
    Guest = 'GUEST',
    Admin = 'ADMIN',
}

export enum KYC_TYPES {
    IS_NEW = 'IS_NEW',
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
    NEEDS_REVIEW = 'NEEDS_REVIEW',
}
