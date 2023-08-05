import axiosClient from './axios-client'

export const nftApi = {
    getNFTByTokenId(tokenId: string) {
        return axiosClient.get('nft/getNFTByTokenId/' + tokenId)
    },
    getNFTs() {
        return axiosClient.get('nft/getNFTs')
    },
    sortNFTBE() {
        const url = 'nft/sortNFT'
        return axiosClient.post(url, { sortBy: 'Oldest' })
    },
    mintNFTFromUserBE(tokenId: string, walletAddress: string) {
        const url = 'nft/mintNFT'
        return axiosClient.post(url, { tokenId, walletAddress })
    },
    filterNFTs(selectedFilters: any) {
        const url = 'nft/filterNFT'
        return axiosClient.post(url, { filters: selectedFilters })
    },
}
