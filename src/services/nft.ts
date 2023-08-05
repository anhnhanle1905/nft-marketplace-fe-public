import { nftApi } from '@/apis'
import { useQueryWithCache } from './common'

const nft_keys = {
    all: () => ['nft_services'] as const,
    getNFTByTokenId: (tokenId?: string) => [nft_keys.all(), 'getNFTByTokenId', tokenId] as const,
    getNFTs: () => [nft_keys.all(), 'getNFTs'] as const,
    filterNFTs: () => [nft_keys.all(), 'filterNFTs'] as const,
}

export const useGetNFTByTokenId = (tokenId: string) => {
    const { data, ...others } = useQueryWithCache(nft_keys.getNFTByTokenId(tokenId), () =>
        tokenId ? nftApi.getNFTByTokenId(tokenId) : {}
    )

    return {
        /**@ts-ignore */
        nftInfo: data?.data || [],
        ...others,
    }
}

export const useGetNFTs = () => {
    const { data, isLoading, ...others } = useQueryWithCache(nft_keys.getNFTs(), () =>
        nftApi.getNFTs()
    )
    const loading = isLoading
    return {
        /**@ts-ignore */
        allNfts: data?.data || [],
        loading,
        ...others,
    }
}
