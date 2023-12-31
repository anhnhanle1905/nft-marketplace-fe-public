import {
    QueryCache,
    QueryFunction,
    QueryKey,
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query'

const queryCache = new QueryCache({
    onError: (error) => {
        console.error(error)
    },
})

export const useQueryWithCache = <TData = unknown>(
    queryKey: QueryKey,
    queryFn: QueryFunction<TData>
): UseQueryResult<TData> => {
    const queryConfig = {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 60,
        queryCache,
    }
    return useQuery<TData>(queryKey, queryFn, queryConfig)
}
