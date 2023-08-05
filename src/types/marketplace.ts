export interface Offering {
    _id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
    min_amount: number
    document: string
    expected_rate: number
    term: number
    pool_type: string
    background: string
}
