import { Goerli, Mainnet } from '@usedapp/core'

export const PERSONA_API_KEY = 'persona_sandbox_fba85229-cf68-4838-999f-225d4a7cf1d0'
export const PERSONA_TEMPLATE_ID = 'itmpl_Uf6H1DoEnVYufxDx41oravF9'
export const PERSONA_ENVIRONMENT_ID = 'env_Wts9YBCwEk32qj1C4gyiPTsb'

export const DEFAULT_SUPPORTED_CHAIN = [
    {
        name: 'Ethereum Mainnet',
        chainId: Mainnet.chainId,
    },
    {
        name: 'Ethereum Testnet',
        chainId: Goerli.chainId,
    },
]

export const USER_WALLET_ADDRESS = 'metemask_address'
export const ACCESS_TOKEN = 'access_token'

export const NFT_DETAILS_FORM_ID = 'nft-details-form'
