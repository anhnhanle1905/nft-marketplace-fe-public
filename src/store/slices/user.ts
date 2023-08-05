import { User } from '@/types'
import { StateCreator } from 'zustand'
export interface UserSlice {
    me: User
    storeUser: (user: User) => void
}

const initialMe = {
    _id: '',
    listNFT: [],
    name: '',
    firstName: '',
    lastName: '',
    wishList: [],
    walletList: [],
    uniqueEmailId: 0,
    email: '',
    isVerified: false,
    nextFreeMint: '',
    isFinishedKYC: false,
}

export const createUserSlice: StateCreator<
    UserSlice,
    [['zustand/devtools', never], ['zustand/persist', never]],
    []
> = (set, get) => ({
    //@ts-ignore
    me: initialMe,
    storeUser: (user: User) => {
        set(() => ({ me: user }))
    },
})
