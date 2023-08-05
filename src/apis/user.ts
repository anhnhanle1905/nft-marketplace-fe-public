import axios from 'axios'
import axiosClient from './axios-client'
import { RequestImportWalletProps, UpdatePasswordForm } from '@/types'

export const userApi = {
    getWishList(address: string) {
        return axiosClient.post('user/getWishListNFT', {
            walletAddress: address,
        })
    },
    getCollectedNFT(address: string) {
        return axiosClient.post('user/getNFTUserFromMongo', {
            address: address,
        })
    },
    activityLikedByOther(address: string) {
        return axiosClient.post('activity/activityLikedByOther', {
            walletAddress: address,
        })
    },
    changeName(name: string, address: string) {
        return axiosClient.post('user/changeName', {
            address: address,
            name: name,
        })
    },
    getUserByAddressOwner(address: string) {
        return axiosClient.post('user/getUserByAddressOwner', {
            address: address,
        })
    },

    filterTransaction(filters: Array<String>, account: string | null) {
        return axiosClient.post('activity/filterTransaction', {
            filters: filters,
            walletAddress: account,
        })
    },
    getUser() {
        return axiosClient.get('user/getUser')
    },

    importWallet(data: RequestImportWalletProps): Promise<any> {
        const url = '/user/importWallet'
        return axiosClient.post(url, data)
    },
    getFavoriteNFT() {
        return axiosClient.get('user/getFavoriteNFT')
    },

    likeNFT(tokenId: number | any) {
        return axiosClient.post('user/likeNFT', {
            tokenId: tokenId,
        })
    },
    dislikeNFT(tokenId: number | any) {
        return axiosClient.post('user/dislikeNFT', {
            tokenId: tokenId,
        })
    },

    resendEmail() {
        return axiosClient.get('user/resendEmail')
    },

    changePassword(data: UpdatePasswordForm): Promise<any> {
        return axiosClient.post('user/changePassword', data)
    },
}
