import { Activity } from './activity'

export interface PoolAddress {
    block_number: number
    created_at: Date
    debt_address: string
    expected_rate: string
    from: string
    pool_address: string
    term: number
    timestamp: Date
    to: string
    tx_hash: string
    updated_at: Date
    _id: string
}

export interface Portfolio {
    name_offering: string
    balance: number
    start_date: Date
    pool_address: string
    token_address: string
}

export interface PortfolioV2 {
    [to: string]: Activity[]
}
