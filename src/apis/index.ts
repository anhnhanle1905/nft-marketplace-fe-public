import axios from 'axios'
import { baseURL } from '@/configs/constants'

export const fetcher = axios.create({ baseURL })

export * from './marketplace'
export * from './nft'
