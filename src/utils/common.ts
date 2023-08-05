import BigNumber from 'bignumber.js'

export function formatAddress(wallet: string, length = 10) {
    if (wallet) {
        if (wallet.length > length * 2) {
            return wallet.slice(0, length) + '...' + wallet.slice(wallet.length - length)
        } else {
            return wallet
        }
    } else return null
}

export const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString('en-GB')

export const formatDecimals18 = (numberFormat: any) => {
    const TEN = new BigNumber(10)
    return new BigNumber(numberFormat).div(TEN.pow(18)).dp(6).toFormat()
}
export const formatMoney = (amount: any) => amount?.toLocaleString()

// export const isDevEnv = () => process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'
export const isDevEnv = true
