// import { fetcher } from '.'

// export const getOrdersFromMongo = async () => {
//     try {
//         const { data } = await fetcher.get('/contract/getOrdersFromMongo')
//         console.log('data: ', data)
//         return data
//     } catch (error) {
//         return false
//     }
// }

interface IMintNFT {
    images?: any
    tokenId?: any
    orderId?: any
    seller?: any
    walletOwner?: any
    name?: any
    status?: any
    price?: any
}

import axiosClient from './axios-client'
import axios from 'axios'

export const marketplaceApi = {
    getOrdersFromMongo() {
        const url = 'contract/getOrdersFromMongo'
        return axiosClient.get(url)
    },
    addOrderBE() {
        const url = 'contract/addOrder'
        return axiosClient.get(url)
    },
    cancelOrderBE(orderId: number) {
        const url = 'contract/cancelOrder'
        return axiosClient.post(url, { orderId })
    },
    executeOrderBE(seller: string, buyer: string, orderId: number) {
        const url = 'contract/executeOrder'
        return axiosClient.post(url, { seller, buyer, orderId })
    },
    sortNFTBE() {
        const url = 'nft/sortNFT'
        return axiosClient.post(url, { sortBy: 'Oldest' })
    },
}

// export const getNFTUserFromMongo = async (_address: string) => {
//     try {
//         const { data } = await fetcher.post('/user/getNFTUserFromMongo', {
//             address: _address,
//         })
//         return data
//     } catch (error) {
//         return false
//     }
// }

// export const addOrder = async () => {
//     try {
//         const { data } = await fetcher.get('/contract/addOrder')

//         return data
//     } catch (error) {
//         return false
//     }
// }

// export const executeOrder = async (seller: string, account: string, _orderId: number) => {
//     try {
//         const { data } = await fetcher.post('/contract/executeOrder', {
//             seller: seller,
//             buyer: account,
//             orderId: _orderId,
//         })

//         console.log('execute res: ', data)

//         return data
//     } catch (error) {
//         return false
//     }
// }
