import nattoken_abi from '@/onchains/abis/nattoken.json'
import nft_abi from '@/onchains/abis/nft.json'
import marketplace_abi from '@/onchains/abis/marketplace.json'

import { Coin } from '@/types'
import { Contract, ethers } from 'ethers'
import { Goerli, Mainnet, ERC20Interface } from '@usedapp/core'
import { isDevEnv } from '@/utils/common'

// export const nattoken_contract = '0xFf24e9Ce8D1c32f01B24bE7b1C9BED386D43c22F'
export const nattoken_contract = '0x006B385edB7B58037Dba2796b122871B3208C03f'

// export const marketplace_contract = '0x9b8CE88feAc9CA68AB3F5C393177D83134b6C00c'
export const marketplace_contract = '0x898256E72bF11AeA2D2c8D1275F644a2Db78AA91'
// 0x13f5aE4fca3D238ed5f2925A19dBb00D58d204Cc

// export const nft_contract = '0x4FB41e38E38Fb7Ba36AE9Aee9D9B9419ffAD7A5A'
export const nft_contract = '0x2e09D13B2bF47D280d9dfde93aBC8c07D0fd4fDa'

export const STABLE_COINS: { DAI: Coin; USDC: Coin; NAT: Coin } = {
    DAI: { address: '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60', decimals: 18, symbol: 'DAI' },
    USDC: { address: '0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C', decimals: 6, symbol: 'USDC' },

    NAT: { address: nattoken_contract, decimals: 18, symbol: 'NAT' },
}

export const natTokenInterface = new ethers.utils.Interface(nattoken_abi)
export const natTokenContract = new Contract(nattoken_contract, natTokenInterface)

export const nftInterface = new ethers.utils.Interface(nft_abi)
export const nftContract = new Contract(nft_contract, nftInterface)

export const marketplaceInterface = new ethers.utils.Interface(marketplace_abi)
export const marketplaceContract = new Contract(marketplace_contract, marketplaceInterface)

export const currentNetwork = isDevEnv ? Goerli : Mainnet
