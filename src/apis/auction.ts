import axiosClient from './axios-client'

export const auctionApi = {
    auctionNFT(tokenId: number, walletAddress: string, price: string) {
        const url = 'auction/auctionNFT'
        return axiosClient.post(url, { tokenId, walletAddress, price })
    },

    addAuctionOrder(endAuction: number, walletAddress: string, minPrice: string, tokenId: string) {
        const url = 'auction/addAuctionOrder'
        return axiosClient.post(url, { endAuction, walletAddress, minPrice, tokenId })
    },

    getAuction(tokenId: number) {
        const url = 'auction/getAuction'
        return axiosClient.post(url, { tokenId })
    },
}
