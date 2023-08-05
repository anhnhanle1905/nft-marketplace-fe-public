export interface Wallet {
    _id: string
}

export interface RequestImportWalletProps {
    userId: string
    walletAddress: string
    signature: string
}

export enum REQUEST_APPROVE_STATUS {
    EMPTY = 'EMPTY',
    IS_NEW = 'IS_NEW',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
    IMPORTED = 'IMPORTED',
}
