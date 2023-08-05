import { ethers } from 'ethers'
import marketplace_abi from '@/onchains/abis/marketplace.json'

const contractInterface = new ethers.utils.Interface(marketplace_abi)

export const callContract = ({ contractAddress }: string | any) => {
    return new ethers.Contract(
        contractAddress,
        contractInterface,
        new ethers.providers.Web3Provider((window as any).ethereum, 'any')
    )
}
