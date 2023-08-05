import { marketplaceApi } from '@/apis'
import { useQueryWithCache } from './common'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const marketplace_keys = {
    all: () => ['marketplace_services'] as const,
    getOrdersFromMongo: () => [...marketplace_keys.all(), 'getOrdersFromMongo'] as const,
    addOrderBE: () => [...marketplace_keys.all(), 'addOrder'] as const,
}

export const useGetOrdersFromMongo = () => {
    const { data, ...others } = useQueryWithCache(marketplace_keys.getOrdersFromMongo(), () =>
        marketplaceApi.getOrdersFromMongo()
    )

    return {
        /**@ts-ignore */
        orders: data?.data || [],
        ...others,
    }
}

export const useAddOrderBE = () => {
    useQuery({
        queryKey: marketplace_keys.addOrderBE(),
        queryFn: () => marketplaceApi.addOrderBE(),
    })
    return 0
}
